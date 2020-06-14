#!/bin/bash
############## Dummy Translator Service ##############
kubectl delete -f ./app/02-configs.yaml
kubectl delete -f ./app/03-translator.yaml
kubectl delete -f ./app/04-english.yaml
kubectl delete -f ./app/05-spanish.yaml

############## Kafka ##############
helm uninstall dts-cp-kafka 

############## Istio ##############
# Grafana
kubectl delete -f istio/grafana/istio-grafana-citadel-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-custom-resources-config.yaml
kubectl delete -f istio/grafana/istio-grafana-galley-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-mesh-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-mixer-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-perf-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-pilot-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-service-dashboard.yaml
kubectl delete -f istio/grafana/istio-grafana-workload-dashboard.yaml

# Cluster Roles
kubectl delete -f istio/clusterroles

# Roles
kubectl delete -f istio/roles

# Services
kubectl delete -f istio/services

# Deployments
kubectl delete -f istio/deployments

# Lists
kubectl delete -f istio/lists

# Pod Disruption Budgets
kubectl delete -f istio/poddisruption

# Custom Resource Definitions
kubectl delete -f istio/customresourcedefinitions

# Service Accounts
kubectl delete -f istio/serviceaccounts

# Config Maps
kubectl delete -f istio/config

# Misc
kubectl delete -f istio/

############## Namespace ##############
kubectl delete -f ./namespace.yaml



