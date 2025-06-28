# 🚀 Kubernetes Learning Series (Beginner to Advanced)

Welcome to my hands-on Kubernetes learning repo. This covers container orchestration concepts, YAML usage, and Kubernetes CLI with real examples, screenshots, and configs.

---

## 📚 Table of Contents

| Day | Topics Covered                                                                 | Folder |
|-----|----------------------------------------------------------------------------------|--------|
| 1   | Intro to Kubernetes & Containers                                               | Day1   |
| 2   | Installing Kubernetes Setup on Fedora + containerd + Minikube                 | Day2   |
| 3   | Pods, YAML, Logs, Describe, and Inspection                                     | Day3   |
| 4   | Deployments, ReplicaSets, Rolling Updates & Rollbacks                         | Day4   |
| 5   | Kubernetes Services (ClusterIP, NodePort) + Exposing Deployments              | Day5   |
| 6   | ConfigMaps & Secrets (Inject configs + secure secrets)                        | Day6   |
| 7   | Volumes, PersistentVolume (PV) & PersistentVolumeClaim (PVC)                  | Day7   |
| 8   | Namespaces & Resource Limits (Isolation + CPU/Memory quotas)                  | Day8   |
| 9   | Health Probes (Liveness & Readiness Checks in Pods)                           | Day9   |
| 10  | Kubernetes Networking (Pod-to-Pod Communication, DNS, and CNI Plugins)        | Day10  |


---

## 📷 Screenshots

Screenshots for each day are stored in the `Images/` folder and are embedded inside the relevant markdown files.

---

## 🛠 Prerequisites

* **OS:** Fedora 40
* **Container Runtime:** containerd
* **Tools Installed:**

  * `kubectl`
  * `minikube`

---

## 🧪 Try It Yourself

Clone this repo, apply the YAML files using `kubectl`, and follow along the notes to practice Kubernetes step-by-step on your local cluster.

```bash
git clone https://github.com/your-username/kubernetes-learning.git
cd kubernetes-learning
kubectl apply -f Day3/nginx-pod.yaml  # Example for Day 3
```

---

## 📅 Coming Next


- Day 11: Ingress Controllers & Routing
- Day 12: Helm (Package Manager for Kubernetes)
- Day 13: RBAC (Access Control)
- Day 14: CI/CD with ArgoCD & GitOps


---

## 📜 License

MIT License — feel free to fork and build on top of this.
