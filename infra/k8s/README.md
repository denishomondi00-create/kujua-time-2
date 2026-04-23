# Kubernetes

These manifests are a strong starting scaffold, not a final production cluster definition.

Recommended next steps before live use:

- move secrets to Sealed Secrets, Vault, or external secret operator
- add readiness and liveness probes
- add horizontal pod autoscaling
- add persistent volumes for MongoDB and Redis if self-hosting
- split staging and production overlays
