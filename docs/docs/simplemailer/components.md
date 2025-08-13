---
sidebar_position: 2
sidebar_label: 'Components'
---
# Components
SimpleMailer consists of two application:
- **Dashboard**: an optional website to view information about the system, jobs and queues. 
- **Worker**: nodes listening to the queue events and executing the jobs.

## Architecture
```mermaid
graph TD
  subgraph Frontend["Admin Dashboard - Next.js"]
    A1["User Interface"]
    A2["API Routes / Server Actions"]
  end

  subgraph Services
    B1["PostgreSQL"]
    B2["S3 - MJML Templates"]
    B3["RabbitMQ"]
    B4["Metrics - Prometheus"]
  end

  subgraph Workers["NestJS Mailer Workers (Kubernetes Pods)"]
    C1["Worker Pod 1"]
    C2["Worker Pod N"]
  end

  subgraph Cloud["Email Provider (SMTP / SES / SendGrid)"]
    D1["Email Service"]
  end

  A1 --> A2
  A2 -->|Enqueue Job| B3
  A2 -->|Store Metadata| B1
  A2 -->|Upload Template| B2
  A2 -->|Read Metrics| B4

  B3 --> C1
  B3 --> C2

  C1 -->|Fetch Template| B2
  C2 -->|Fetch Template| B2

  C1 -->|Send Email| D1
  C2 -->|Send Email| D1

  C1 -->|Log Result| B1
  C2 -->|Log Result| B1

  C1 -->|Expose Metrics| B4
  C2 -->|Expose Metrics| B4
```
## External services
- **PostgreSQL Database**: the main database where all logs, accounts and templates are stored.
- **RabbitMQ Queue**: the main queue which ensures that all mail jobs are executed successfully.
- **S3 Bucket** *(optional)*: can store all the templates in an S3 compatible bucket. Not neccessary, but highly recommended.