# Distributed Job Scheduler Setup

## Requirements
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- NPM

## Installation

1. **Install Dependencies**
   Run the following from the root directory:
   ```bash
   npm install
   ```

2. **Database Setup**
   Ensure PostgreSQL is running. Configure your `.env` file with the connection string.
   ```bash
   npm run db:push
   npm run db:generate
   ```

3. **Running the API**
   Navigate to the API app and start the development server:
   ```bash
   cd apps/api
   npm run start:dev
   ```

4. **Running the Worker**
   Navigate to the Worker app and start polling:
   ```bash
   cd apps/worker
   npm run dev
   ```

5. **Running the Frontend Dashboard**
   Navigate to the Web app:
   ```bash
   cd apps/web
   npm run dev
   ```
   Access the dashboard at `http://localhost:3000`.
