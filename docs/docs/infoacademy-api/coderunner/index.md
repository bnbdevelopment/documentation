---
title: BNB CodeRunner
sidebar_label: CodeRunner
---
BNB CodeRunner is an open-source container orchestration architecture. It is responsbile for creating, managing and deleting user runtimes, enabling code execution in web environments.

## Architecture
- **Orchestrator**: an application written in Go, responsible for creating, managing, terminating code running environments. It deploys a custom Python image embedded with the IPython Kernel.
- **IPython Kernel**: serves as the computational engine to execute code.
- **RabbitMQ Queue**: every code execution request submitted by the user creates an event in the queue. Premium users will have higher priority in the queue.
- **ZeroMQ**: embeddable networking library / concurrency framework, responsible for the communication between the user and code environment.
```mermaid
flowchart TD
    subgraph Frontend/User
        A1[User Interface]
        A2[WebSocket/API Client]
    end

    subgraph RabbitMQ
        MQ[Task Queue]
    end

    subgraph Orchestrator
        OC[Queue Consumer]
        RM[Runtime Manager]
        ZC[ZMQ Client]
        SM[Session Manager]
    end

    subgraph Runtime Environment
        C1[Python Container]
        subgraph IPython Kernel
            Z1[ZMQ Shell]
            Z2[ZMQ IOPub]
            Z3[ZMQ Stdin]
        end
    end

    A1 --> A2
    A2 --> MQ
    MQ --> OC

    OC -->|create_session| RM
    OC -->|submit_code| ZC
    OC -->|submit_test| ZC
    OC -->|terminate_session| SM

    RM -->|start containerd/firecracker| C1
    C1 --> Z1
    C1 --> Z2
    C1 --> Z3

    ZC --> Z1
    Z2 --> ZC
    Z3 --> ZC

    SM --> RM
    SM --> C1

    ZC --> A2

    classDef ext fill:#f9f,stroke:#333,stroke-width:1px;
    classDef internal fill:#bbf,stroke:#222,stroke-width:1px;
    class MQ,OC,RM,ZC,SM internal;
    class A1,A2 ext;
```
