# Compose

- `docker-compose.yml`: base local stack
- `docker-compose.dev.yml`: mount-based developer stack
- `docker-compose.monitoring.yml`: Prometheus + Grafana

Typical usage:

```bash
docker compose -f infra/compose/docker-compose.yml up -d
docker compose -f infra/compose/docker-compose.monitoring.yml up -d
```
