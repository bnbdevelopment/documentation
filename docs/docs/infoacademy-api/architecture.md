---
sidebar_position: 3
sidebar_label: 'Architecture'
---
# Architecture
## Architecture Diagram
```mermaid
graph TD
  subgraph Client
    A[Frontend App]
  end

  subgraph Gateway
    B[API Gateway]
  end

  subgraph Microservices
    M1[User Service]
    M2[Payments Service]
    M3[Task Service]
    M4[Courses Service]
    M5[Runner Service]
  end

  subgraph Shared
    F[Shared Prisma Schema]
    S3[S3 Bucket]
    S4[Redis Cache]
    S5[RabbitMQ Queue]
    H[(PostgreSQL Database)]
  end

  A -->|HTTP| B
  B -->|gRPC| M1
  B -->|gRPC| M2
  B -->|gRPC| M3
  B -->|gRPC| M4
  B -->|gRPC| M5

  B -->|Caching| S4

  M1 -->|Prisma Client| F
  M2 -->|Prisma Client| F
  M3 -->|Prisma Client| F
  M4 -->|Prisma Client| F

  M2 -->|Payments| S5

  M3 -->|Store Templates| S3

  M5 -->|Cache Usage Limits| S4
  M5 -->|Code Execution Requests| S5


  F --> H
```
## Services
The application consists of the following microservices:
- **User Service**: is responsible for handling user data, like scores, emails and updating the meta-data in the database.
- **Payments Service**: responsible for handling payments and subscriptions
- **Task Service**: responsible for generating the desired tasks for the users. It fetches the template file, generates a JSON task description and solution, provides code snippets when necessary, and also handles the validation of a task solution.
- **Courses Service**: responsible for creating, managing, deleting courses from the site.
- **Runner Service**: instructed by task service, handles user code session, ensures usage limits, and instructs certain code snippets to be executed in an isolated environment

### External Services
- **PostgreSQL**: main database, storing all of the imporant artifacts regarding the application. Used by all microservices.
- **Redis**: caching solution, also stores the usage limits / cooldowns of users, timeouts.
- **S3**: persistent storage solution, houses all task files defined in `.yaml` and also video content.
- **RabbitMQ**: main queue solution, mostly used for handling code execution requests and processing subscriptions.
