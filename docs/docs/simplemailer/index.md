---
sidebar_position: 1
sidebar_label: 'Welcome'
---

# Welcome!
SimpleMailer is an open source, self-hostable, highly scalable centralized mail sending solution for your services, written in TypeScript.
## Features
- **Declarative configuration**: all information are stored in a single `config.yaml` document.
- **Automatically scaleable**: with Kubernetes, the worker pods can automatically scale based on the sent mail rate.
- **Fault tolerant**: using RabbitMQ as a queue manager, it ensures that all of your mails gets delivered.
- **Metrics**: exports metrics for Prometheus at the `/metrics` endpoint.
- **Self-hostable**: host it on your own infrastructure, either in as a Docker container or for advanced configurations with Kubernetes!
- **Open source**: contribute anytime you wish! No adware, all code is visible to you.