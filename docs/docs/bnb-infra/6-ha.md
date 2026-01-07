---
sidebar_position: 6
sidebar_label: 'HA & Fault Tolerance'
---

# HA & Fault Tolerance
We have architected our infrastructure in a way that ensures that under all circumstances the hosted services remain online and working.

## Highly Available Services
This includes:
- **Networking**: our software networking infrastructure ensures that all requests get successfully delivered, while constantly monitoring the health of our machines. This includes replicated tunnels (our traffic origin) and multiple loadbalancers working together.
- **Database**: our main databases are constantly replicated over multiple nodes, both on local and cloud environment.
- **Queue**: our project "[InfoAcademy](https://infoacademy.hu)" requires advanced event handling and queue management, therefore we operate two separate RabbitMQ Queues, ensuring that queue messages always get delivered to their destinations.
- **Storage**: both our S3 Bucket and Kubernetes PV storages are replicated across nodes, with multiple availabilty zones.
- **Cluster**: our Kubernetes cluster ensures quick incident handling both in software and hardware failure with constant health checks, horizontal and vertical autoscaling.

## Highly Available Infrastructure
Our on-premise infrastructure ensures high availability also from the hardware perspective. We utilize methods to keep our cluster running even in
- **power outages** caused by the local environment,
- **network outages** by providing separate internet connections, and
- **harware failure** by using multiple CPUs, PSUs, NICs and RAID storage pools.

## Architecture Overview
```md
flowchart LR
 subgraph OP_DB["PostgreSQL (Patroni Primary)"]
        OP_PG1[("Postgres Leader")]
        OP_PG2[("Postgres Replica")]
  end
 subgraph ONPREM["On-Premises Kubernetes Cluster (Primary)"]
    direction TB
        OP_CF["cloudflared (Tunnel)"]
        OP_Traefik["Traefik Ingress"]
        OP_App["Production Apps - Stateless Workloads"]
        OP_DB
        OP_K8S["Kubernetes: 3 Masters + 3 Workers\ with Cilium"]
        OP_HAProxy["HAProxy - API LB"]
  end
 subgraph HZ_DB["PostgreSQL (Patroni Standby Cluster)"]
        HZ_PG1[("Postgres Replica")]
  end
 subgraph HETZNER["Hetzner Cloud Kubernetes Cluster (Failover)"]
    direction TB
        HZ_CF["cloudflared Tunnel"]
        HZ_Traefik["Traefik Ingress"]
        HZ_App["Production Apps Warm Standby"]
        HZ_DB
        HZ_K8S["Kubernetes Talos Linux: 1 Control Plane + 1:N Workers"]
        HZ_AS["Cluster Autoscaler: Hetzner Cloud"]
  end
 subgraph TS["Tailscale VPN (Private Mesh)"]
        TS_OP["On-Prem Nodes"]
        TS_HZ["Hetzner Nodes"]
  end
    User["Users / Clients"] --> CF["Cloudflare Edge Load Balancer"]
    CF -- Primary Origin --> OP_CF
    CF -- Failover Origin --> HZ_CF
    OP_CF --> OP_Traefik
    OP_Traefik --> OP_App
    HZ_CF --> HZ_Traefik
    HZ_Traefik --> HZ_App
    OP_PG1 -- Streaming Replication --> HZ_PG1
    OP_K8S --> OP_Traefik & OP_App & OP_DB
    OP_HAProxy --> OP_K8S
    HZ_K8S --> HZ_Traefik & HZ_App & HZ_DB
    HZ_AS --> HZ_K8S
    OP_K8S --- TS_OP
    HZ_K8S --- TS_HZ
    TS_OP --- TS_HZ
```