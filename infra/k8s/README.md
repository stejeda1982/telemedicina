# Kubernetes manifests

Manifiestos para despliegue en EKS/GKE. Cada namespace se aísla con
NetworkPolicy conforme a TDD sección 12.2.

## Estructura

- `00-namespaces.yaml` — namespaces wso2, bff, core, data, observability
- `01-networkpolicies.yaml` — aislamiento de tráfico entre namespaces
- `02-ingress.yaml` — Ingress para exposición pública
- `wso2/` — Helm values para WSO2 IS/APIM/MI
- `core/` — deployments de los 12 microservicios (en un solo archivo)
- `bff/` — deployments de los 3 BFF

## Aplicación

```bash
kubectl apply -f infra/k8s/00-namespaces.yaml
kubectl apply -f infra/k8s/01-networkpolicies.yaml
kubectl apply -f infra/k8s/02-ingress.yaml
kubectl apply -f infra/k8s/core/
kubectl apply -f infra/k8s/bff/
```
