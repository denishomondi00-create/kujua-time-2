# Deployment

## Recommended hosting shape

- web and docs on Vercel or container platform
- API, worker, and scheduler on Railway, Render, Fly, ECS, or Kubernetes
- managed MongoDB replica set
- managed Redis
- managed object storage for file assets
- managed secrets

## Core deployment rule

API, worker, and scheduler remain independently deployable.

## Environment rollout order

1. staging
2. pre-production smoke
3. production

## Checklist

- webhook secrets configured
- calendar OAuth callback URLs set
- MongoDB replica set verified
- Redis connectivity verified
- queue consumers live before public traffic cutover
- worker retry policies reviewed
