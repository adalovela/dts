#!/bin/bash
############## Dummy Translator Service ##############
kubectl delete -f ./app/02-configs.yaml
kubectl delete -f ./app/03-translator.yaml
kubectl delete -f ./app/04-english.yaml
kubectl delete -f ./app/05-spanish.yaml

############## Kafka ##############
helm uninstall dts-cp-kafka 

############## Istio ##############
# Destination Rules
kubectl delete -f 01-istio/17-destinationrules

# Rules
kubectl delete -f 01-istio/16-rules

# Instances
kubectl delete -f 01-istio/15-instances

# Handlers
kubectl delete -f 01-istio/14-handlers

# Attribute Manifests
kubectl delete -f 01-istio/13-attributemanifests

# Pod Disruption Budgets
kubectl delete -f 01-istio/12-poddisruptions

# Mutating Webhooks config
kubectl delete -f 01-istio/11-mutatingwebhooks

# Lists
kubectl delete -f 01-istio/10-lists

# Deployments
kubectl delete -f 01-istio/09-deployments

# Services
kubectl delete -f 01-istio/08-services

# Roles
kubectl delete -f 01-istio/07-roles

# Jobs
kubectl delete -f 01-istio/06-jobs

# Cluster Roles
kubectl delete -f 01-istio/05-clusterroles

# Service Accounts
kubectl delete -f 01-istio/04-serviceaccounts

# Grafana
kubectl delete -f 01-istio/03-grafana/istio-grafana-citadel-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-custom-resources-config.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-galley-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-mesh-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-mixer-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-perf-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-pilot-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-service-dashboard.yaml
kubectl delete -f 01-istio/03-grafana/istio-grafana-workload-dashboard.yaml

# Config Maps
kubectl delete -f 01-istio/02-config

# Misc
kubectl delete -f 01-istio/

# Secrets
kubectl delete -f 01-istio/01-secrets

# Custom Resource Definitions
kubectl delete -f 01-istio/00-customresourcedefinitions

############## Namespace ##############
kubectl delete -f ./namespace.yaml

















