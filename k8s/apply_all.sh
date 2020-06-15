#!/bin/bash
############## Namespace ##############
kubectl apply -f ./namespace.yaml

############## Istio ##############

# Custom Resource Definitions
kubectl apply -f 01-istio/00-customresourcedefinitions

# Secrets
kubectl apply -f 01-istio/01-secrets

# Misc
kubectl apply -f 01-istio/

# Config Maps
kubectl apply -f 01-istio/02-config

# Grafana
kubectl apply -f 01-istio/03-grafana/istio-grafana-citadel-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-custom-resources-config.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-galley-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-mesh-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-mixer-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-perf-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-pilot-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-service-dashboard.yaml
kubectl apply -f 01-istio/03-grafana/istio-grafana-workload-dashboard.yaml

# Service Accounts
kubectl apply -f 01-istio/04-serviceaccounts

# Cluster Roles
kubectl apply -f 01-istio/05-clusterroles

# Jobs
kubectl apply -f 01-istio/06-jobs

# Roles
kubectl apply -f 01-istio/07-roles

# Services
kubectl apply -f 01-istio/08-services

# Deployments
kubectl apply -f 01-istio/09-deployments

# Lists
kubectl apply -f 01-istio/10-lists

# Mutating Webhooks config
kubectl apply -f 01-istio/11-mutatingwebhooks

# Pod Disruption Budgets
kubectl apply -f 01-istio/12-poddisruptions

# Attribute Manifests
kubectl apply -f 01-istio/13-attributemanifests

# Handlers
kubectl apply -f 01-istio/14-handlers

# Instances
kubectl apply -f 01-istio/15-instances

# Rules
kubectl apply -f 01-istio/16-rules

# Destination Rules
kubectl apply -f 01-istio/17-destinationrules

############## Kafka ##############
helm install dts-cp-kafka ./02-kafka/charts/

############## Dummy Translator Service ##############
kubectl apply -f ./03-app/02-configs.yaml
kubectl apply -f ./03-app/03-translator.yaml
kubectl apply -f ./03-app/04-english.yaml
kubectl apply -f ./03-app/05-spanish.yaml

