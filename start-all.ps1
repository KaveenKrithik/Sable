# Start up the Docker containers (Postgres, Redis)
Write-Host "Starting databases via Docker Compose..." -ForegroundColor Cyan
docker-compose up -d

# Wait a few seconds for DBs to initialize
Start-Sleep -Seconds 5

# Push the database schema
Write-Host "Pushing database schema..." -ForegroundColor Cyan
npm run db:push

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
npm run db:generate

Write-Host "Starting the Distributed Job Scheduler Platform..." -ForegroundColor Green

# Start the API, Worker, and Web apps in parallel using Start-Process
Start-Process powershell -ArgumentList "-NoExit -Command `"cd apps\api; npm run start:dev`"" -Wait:$false
Start-Process powershell -ArgumentList "-NoExit -Command `"cd apps\worker; npm run dev`"" -Wait:$false
Start-Process powershell -ArgumentList "-NoExit -Command `"cd apps\web; npm run dev`"" -Wait:$false

Write-Host "All services started! The web dashboard will be available at http://localhost:3000" -ForegroundColor Green
