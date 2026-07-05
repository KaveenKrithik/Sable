import { PrismaClient } from '@djs/database';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const WORKER_ID = uuidv4();
const HEARTBEAT_INTERVAL = 5000;
const POLL_INTERVAL = 2000;

async function claimJob() {
  // Use a raw query for SKIP LOCKED to claim exactly one QUEUED job
  // This ensures concurrent workers don't pick the same job.
  const jobs: any[] = await prisma.$queryRaw`
    UPDATE "Job"
    SET status = 'CLAIMED', "updatedAt" = NOW()
    WHERE id = (
      SELECT id
      FROM "Job"
      WHERE status = 'QUEUED' AND "runAt" <= NOW()
      ORDER BY priority DESC, "createdAt" ASC
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    RETURNING *;
  `;

  if (jobs && jobs.length > 0) {
    return jobs[0];
  }
  return null;
}

async function processJob(job: any) {
  console.log(`[Worker ${WORKER_ID}] Processing Job: ${job.id}`);
  
  // Create execution record
  const execution = await prisma.jobExecution.create({
    data: {
      jobId: job.id,
      workerId: WORKER_ID,
      status: 'RUNNING',
    },
  });

  try {
    await prisma.job.update({
      where: { id: job.id },
      data: { status: 'RUNNING' },
    });

    // SIMULATE ACTUAL WORK
    // If payload has delay, we wait.
    const delay = job.payload?.delay || 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    // Sometimes randomly fail to test retries if payload specifies failRate
    if (job.payload?.failRate && Math.random() < job.payload.failRate) {
      throw new Error('Simulated random failure');
    }

    // Mark as completed
    await prisma.jobExecution.update({
      where: { id: execution.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
    await prisma.job.update({
      where: { id: job.id },
      data: { status: 'COMPLETED' },
    });
    console.log(`[Worker ${WORKER_ID}] Completed Job: ${job.id}`);
  } catch (error: any) {
    console.error(`[Worker ${WORKER_ID}] Failed Job: ${job.id}`, error);
    
    // Handle retries
    const retryCount = job.retryCount + 1;
    let nextStatus: any = 'RETRY';
    let nextRunAt = new Date(Date.now() + job.retryDelay);
    
    if (job.backoffType === 'EXPONENTIAL') {
      nextRunAt = new Date(Date.now() + job.retryDelay * Math.pow(2, retryCount));
    }

    if (retryCount >= job.maxRetries) {
      nextStatus = 'DEAD_LETTER';
    }

    await prisma.jobExecution.update({
      where: { id: execution.id },
      data: { status: 'FAILED', completedAt: new Date(), error: error.message },
    });

    await prisma.job.update({
      where: { id: job.id },
      data: { 
        status: nextStatus,
        retryCount,
        runAt: nextRunAt
      },
    });
  }
}

async function startPolling() {
  console.log(`[Worker ${WORKER_ID}] Started polling queues...`);
  
  while (true) {
    try {
      const job = await claimJob();
      if (job) {
        // Process asynchronously, could limit concurrency per worker
        processJob(job);
      } else {
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      }
    } catch (error) {
      console.error(`[Worker ${WORKER_ID}] Polling error:`, error);
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
    }
  }
}

async function startHeartbeat() {
  await prisma.worker.upsert({
    where: { id: WORKER_ID },
    create: { id: WORKER_ID, name: `Worker-${WORKER_ID.substring(0, 5)}`, status: 'ONLINE' },
    update: { lastHeartbeat: new Date(), status: 'ONLINE' },
  });

  setInterval(async () => {
    try {
      await prisma.worker.update({
        where: { id: WORKER_ID },
        data: { lastHeartbeat: new Date() },
      });
      // Optionally store metrics in redis
      await redis.setex(`worker:heartbeat:${WORKER_ID}`, 10, 'ONLINE');
    } catch (error) {
      console.error('Heartbeat failed', error);
    }
  }, HEARTBEAT_INTERVAL);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log(`[Worker ${WORKER_ID}] Shutting down...`);
  await prisma.worker.update({
    where: { id: WORKER_ID },
    data: { status: 'OFFLINE' },
  });
  await prisma.$disconnect();
  redis.disconnect();
  process.exit(0);
});

async function bootstrap() {
  await prisma.$connect();
  startHeartbeat();
  startPolling();
}

bootstrap();
