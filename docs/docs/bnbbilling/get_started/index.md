---
title: Getting Started
sidebar_label: Quick Start
sidebar_position: 1
---

# Getting Started

Get the BNB Billing System up and running in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **pnpm**: v8 or higher (`npm install -g pnpm`)
- **Docker**: v20 or higher ([Download](https://www.docker.com/))
- **Docker Compose**: v2 or higher (included with Docker Desktop)
- **Git**: For cloning the repository

**Optional**:
- **PostgreSQL client** (`psql`) for database inspection
- **Redis CLI** (`redis-cli`) for cache inspection
- **cURL** or **Postman** for API testing

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bnb/billing-system.git
cd billing-system/billing-backend
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required npm packages including:
- NestJS framework
- Prisma ORM
- Redis client (ioredis)
- Authentication libraries (Passport, JWT, Argon2)
- Validation libraries (class-validator, class-transformer)

### 3. Start Infrastructure Services

Start PostgreSQL, Redis, and ClickHouse using Docker Compose:

```bash
# From the project root
cd ..
docker-compose up -d
```

**Verify services are running**:
```bash
docker-compose ps
```

You should see:
```
NAME                STATUS
postgres            running
redis               running
clickhouse          running
```

### 4. Configure Environment

Copy the example environment file:

```bash
cd billing-backend
cp .env.example .env
```

Edit `.env` and configure the following variables:

```bash
# Database
DATABASE_URL="postgresql://billing_user:billing_password@localhost:5432/billing_db"

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD="redis_password"

# ClickHouse
CLICKHOUSE_HOST="localhost"
CLICKHOUSE_PORT=8123
CLICKHOUSE_DATABASE="billing_db"
CLICKHOUSE_USER="clickhouse_user"
CLICKHOUSE_PASSWORD="clickhouse_password"

# JWT (CHANGE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
JWT_EXPIRES_IN="24h"

# Admin API Key (CHANGE IN PRODUCTION!)
ADMIN_API_KEY="admin-key-for-dev-do-not-use-in-prod-1234567890"

# Idempotency
IDEMPOTENCY_ENABLED=true
IDEMPOTENCY_TTL_SECONDS=86400
IDEMPOTENCY_LOCK_TIMEOUT_SECONDS=30
IDEMPOTENCY_REQUIRE_BY_DEFAULT=false

# Application
NODE_ENV="development"
PORT=3000
LOG_LEVEL="debug"
```

**Security Warning**: Never commit `.env` to version control. Always use strong, unique secrets in production.

### 5. Run Database Migrations

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

You should see:
```
✔ Generated Prisma Client
✔ Applied migration: init
```

**Verify database schema**:
```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can browse tables.

### 6. Start the Application

```bash
pnpm start:dev
```

The application will start in watch mode and automatically reload on file changes.

**Expected output**:
```
[Nest] INFO  [NestFactory] Starting Nest application...
[Nest] INFO  [InstanceLoader] DatabaseModule dependencies initialized
[Nest] INFO  [InstanceLoader] RedisModule dependencies initialized
[Nest] INFO  [InstanceLoader] ClickHouseModule dependencies initialized
[Nest] INFO  [InstanceLoader] AuthModule dependencies initialized
[Nest] INFO  [InstanceLoader] IdempotencyModule dependencies initialized
[Nest] INFO  [NestApplication] Nest application successfully started
[Nest] INFO  Application running on http://localhost:3000
```

### 7. Verify Installation

Test the health check endpoint:

```bash
curl http://localhost:3000/health
```

**Expected response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Test the readiness check:

```bash
curl http://localhost:3000/health/ready
```

**Expected response** (all services up):
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" },
    "clickhouse": { "status": "up" }
  }
}
```

**Installation complete!**

---

## Quick Start Tutorial

### Step 1: Register a Tenant

Register your first tenant using the admin API:

```bash
curl -X POST http://localhost:3000/tenants/register \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: admin-key-for-dev-do-not-use-in-prod-1234567890" \
  -d '{
    "name": "My First App",
    "appId": "my-first-app",
    "appSecret": "super-secret-password-123",
    "webhookUrl": "https://example.com/webhook"
  }'
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "appId": "my-first-app",
  "name": "My First App",
  "webhookUrl": "https://example.com/webhook",
  "status": "ACTIVE",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Save the `appId` and `appSecret` - you'll need them to authenticate!**

### Step 2: Login and Get JWT Token

Authenticate to receive a JWT token:

```bash
curl -X POST http://localhost:3000/tenants/login \
  -H "Content-Type: application/json" \
  -d '{
    "appId": "my-first-app",
    "appSecret": "super-secret-password-123"
  }'
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "tokenType": "Bearer"
}
```

**Copy the `accessToken` - it's valid for 24 hours!**

### Step 3: Make Authenticated Request

Get your tenant information:

```bash
curl -X GET http://localhost:3000/tenants/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"
```

**Response**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "appId": "my-first-app",
  "name": "My First App",
  "status": "ACTIVE",
  ...
}
```

### Step 4: Update Your Tenant

Update tenant information:

```bash
curl -X PATCH http://localhost:3000/tenants/me \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Updated App Name"
  }'
```

**Congratulations! You've successfully set up the BNB Billing System!**

---

## Development Workflow

### Daily Development

Start all services and the application:

```bash
# Terminal 1: Infrastructure
docker-compose up

# Terminal 2: Application (watch mode)
cd billing-backend
pnpm start:dev
```

### Common Commands

```bash
# Development
pnpm start:dev          # Start with watch mode
pnpm start:debug        # Start with debugger

# Build
pnpm build              # Compile TypeScript

# Production
pnpm start:prod         # Run compiled version

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage
pnpm test:e2e           # Run end-to-end tests

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Run Prettier

# Database
npx prisma studio       # Open database GUI
npx prisma migrate dev  # Create new migration
npx prisma generate     # Regenerate Prisma client
```

### Accessing Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Application** | http://localhost:3000 | - |
| **Prisma Studio** | http://localhost:5555 | - |
| **PostgreSQL** | localhost:5432 | billing_user / billing_password |
| **Redis** | localhost:6379 | redis_password |
| **ClickHouse HTTP** | http://localhost:8123 | clickhouse_user / clickhouse_password |

### Database Management

**Connect to PostgreSQL**:
```bash
psql postgresql://billing_user:billing_password@localhost:5432/billing_db
```

**Connect to Redis**:
```bash
redis-cli -h localhost -p 6379 -a redis_password
```

**Query ClickHouse**:
```bash
curl "http://localhost:8123/?user=clickhouse_user&password=clickhouse_password" \
  -d "SELECT * FROM audit_logs LIMIT 10"
```

---

## Troubleshooting

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 pnpm start:dev
```

### Database Connection Failed

**Error**: `Can't reach database server`

**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

### Redis Connection Failed

**Error**: `Redis connection error`

**Solution**:
```bash
# Check if Redis is running
docker-compose ps redis

# Restart Redis
docker-compose restart redis

# Test connection
redis-cli -h localhost -p 6379 -a redis_password ping
```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Migration Failed

**Error**: `Migration failed to apply`

**Solution**:
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev --name fix_schema
```

---

## Next Steps

Now that you have the system running:

1. **Explore the API**: [API Reference](../api/)
2. **Understand the Architecture**: [Core Concepts](../core/architecture)

---

## Getting Help

- **Email**: contact@bnbdevelopment.hu
