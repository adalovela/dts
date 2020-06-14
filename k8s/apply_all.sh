#!/bin/bash
############## Namespace ##############
kubectl apply -f ./namespace.yaml

############## Istio ##############
# Secrets
kubectl apply -f istio/01-secrets

# Misc
kubectl apply -f istio/

# Config Maps
kubectl apply -f istio/02-config

# Grafana
kubectl apply -f istio/03-grafana/istio-grafana-citadel-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-custom-resources-config.yaml
kubectl apply -f istio/03-grafana/istio-grafana-galley-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-mesh-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-mixer-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-perf-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-pilot-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-service-dashboard.yaml
kubectl apply -f istio/03-grafana/istio-grafana-workload-dashboard.yaml

# Service Accounts
kubectl apply -f istio/04-serviceaccounts

# Cluster Roles
kubectl apply -f istio/05-clusterroles

# Jobs
kubectl apply -f istio/06-jobs

# Roles
kubectl apply -f istio/07-roles

# Services
kubectl apply -f istio/08-services

# Deployments
kubectl apply -f istio/09-deployments

# Lists
kubectl apply -f istio/10-lists

# Mutating Webhooks config
kubectl apply -f istio/11-mutatingwebhooks

# Pod Disruption Budgets
kubectl apply -f istio/12-poddisruption

# Custom Resource Definitions
kubectl apply -f istio/customresourcedefinitions

############## Kafka ##############
helm install dts-cp-kafka ./kafka/charts/

############## Dummy Translator Service ##############
kubectl apply -f ./app/02-configs.yaml
kubectl apply -f ./app/03-translator.yaml
kubectl apply -f ./app/04-english.yaml
kubectl apply -f ./app/05-spanish.yaml

