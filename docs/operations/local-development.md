# Local development

## Requirements

- Node 20
- pnpm 9
- Docker
- MongoDB replica set support
- Redis

## Quick start

```bash
cp .env.example .env
pnpm install
docker compose -f infra/compose/docker-compose.yml up -d
pnpm dev
```

## Important local rule

Mongo transactions need replica set support. The Compose stack initializes a single-node local replica set for that reason.

## Suggested ports

- web: 3000
- docs: 3001
- api: 4000
- mongo: 27017
- redis: 6379
- prometheus: 9090
- grafana: 3002
