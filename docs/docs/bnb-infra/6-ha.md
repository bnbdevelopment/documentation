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