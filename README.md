# 🚀 Kubernetes Learning Series (Beginner to Advanced)

Welcome to my hands-on Kubernetes learning journey. This repository documents practical tasks, YAML configurations, Kubernetes CLI usage, and DevOps project deployment — all broken down day-by-day with examples, screenshots, and real troubleshooting.

---

## 📚 Table of Contents

| Day | Topics Covered                                                    | Folder |
|-----|-------------------------------------------------------------------|--------|
| 1   | Intro to Kubernetes & Containers                                  | Day1   |
| 2   | Installing Kubernetes Setup on Fedora + containerd + Minikube    | Day2   |
| 3   | Pods, YAML, Logs, Describe, and Inspection                        | Day3   |
| 4   | Deployments, ReplicaSets, Rolling Updates & Rollbacks            | Day4   |
| 5   | Kubernetes Services (ClusterIP, NodePort) + Exposing Deployments | Day5   |
| 6   | ConfigMaps & Secrets (Inject configs + secure secrets)           | Day6   |
| 7   | Volumes, PersistentVolume (PV) & PersistentVolumeClaim (PVC)     | Day7   |
| 8   | Namespaces & Resource Limits (Isolation + CPU/Memory quotas)     | Day8   |
| 9   | Health Probes (Liveness & Readiness Checks in Pods)              | Day9   |
| 10  | Kubernetes Networking (Pod-to-Pod Communication, DNS, CNI)       | Day10  |
| 11  | Ingress Controllers & Routing                                     | Day11  |
| 12  | Helm (Package Manager for Kubernetes)                            | Day12  |
| 13  | RBAC (Access Control with Roles and Bindings)                    | Day13  |
| 14  | Full-Stack CI/CD Deployment with Docker, Ingress, and GitOps     | Day14  |

---

## 🖼️ Screenshots

Screenshots and config files for each day are available in the `Images/` folder and embedded inside each day's notes.

---

## 🛠️ Prerequisites

- **Operating System**: Fedora 40
- **Container Runtime**: `containerd`
- **Cluster Setup**: Minikube
- **Required Tools**:
  - `kubectl`
  - `minikube`
  - `docker`
  - `bun`
  - `node` & `typescript`
  - Optional: Ingress controller (NGINX) setup for `/etc/hosts` routing

---

## 🧪 Try It Yourself

```bash
git clone https://github.com/your-username/kubernetes-learning.git
cd kubernetes-learning

# Example for Day 3
kubectl apply -f Day3/nginx-pod.yaml

Each day folder contains all .yaml, .ts, and Docker-related files to run and test locally.

✅ Latest Progress: Day 14 (DevOps Academy Website Deployment)
Deployed full-stack application with:

Frontend (React + Vite)

Backend (Express + Bun + TypeScript)

Dockerized both services with multistage builds

Created Kubernetes deployments, services, ingress, configmap & secrets

Faced and resolved multiple runtime, module, and build issues


📅 Coming Next
Day 15: StatefulSets and Running Databases in Kubernetes

Day 16: Monitoring with Prometheus and Grafana

Day 17: Kubernetes Operators & CRDs Deep Dive


📜 License
MIT License — you're free to fork, share, and build on this project!

---

Let me know if you’d like:

- Screenshots embedded into the README.
- A badge showing Day 14 completed ✅.
- GitHub Actions to deploy this repo to a cluster automatically.

