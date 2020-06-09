#!/bin/bash
kubectl apply -f istio/

# Config Maps
kubectl apply -f istio/config

# Service Accounts
kubectl apply -f istio/serviceaccounts

# Custom Resource Definitions
kubectl apply -f istio/customresourcedefinitions

# Grafana
kubectl apply -f istio/grafana/istio-grafana-citadel-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-custom-resources-config.yaml
kubectl apply -f istio/grafana/istio-grafana-galley-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-mesh-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-mixer-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-perf-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-pilot-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-service-dashboard.yaml
kubectl apply -f istio/grafana/istio-grafana-workload-dashboard.yaml

# Cluster Roles
kubectl apply -f istio/clusterroles

# Roles
kubectl apply -f istio/roles

# Services
kubectl apply -f istio/services

# Deployments
kubectl apply -f istio/deployments

# Lists
kubectl apply -f istio/lists

# Pod Disruption Budgets
kubectl apply -f istio/poddisruption

