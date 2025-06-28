# 🚀 Day 2: Kubernetes Setup on Fedora (Using Minikube, kubectl, and containerd)

> 📌 **OS Used:** Fedora 40  
> 🖥️ This guide is specifically for Fedora users who want to set up a **local Kubernetes cluster** using **Minikube**, **containerd**, and **kubectl**.

---

## 🔧 Prerequisites

Ensure your system meets the following:

- ✅ Fedora 36+ (tested on Fedora 40)
- ✅ At least 2 CPUs, 2GB RAM, 20GB disk
- ✅ Virtualization enabled (BIOS/UEFI)
- ✅ sudo/root access
- ✅ Internet connection

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
# Output should be >= 1

📦 Required Tools
We will install:

containerd → Container runtime

kubectl → Kubernetes CLI

minikube → Lightweight Kubernetes cluster

Step 1: Install containerd

# Install dependencies
sudo dnf install -y yum-utils device-mapper-persistent-data lvm2

# Install containerd
sudo dnf install -y containerd

# Enable and start containerd
sudo systemctl enable --now containerd

# Check containerd status
systemctl status containerd


Step 2: Install kubectl
# Download latest stable version
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Make it executable
chmod +x kubectl

# Move it to a system-wide location
sudo mv kubectl /usr/local/bin/

# Verify install
kubectl version --client

If curl fails, you can manually download from:
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/


Step 3: Install Minikube
# Download Minikube binary
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install system-wide
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verify
minikube version

Step 4: Start Kubernetes Cluster (with containerd)
# Start Minikube with containerd
minikube start --container-runtime=containerd --driver=docker

 Step 5: Verify Installation
minikube status

kubectl get nodes

kubectl cluster-info


 Installation Logs (From My Fedora 40 Setup)
● containerd.service - containerd container runtime
     Loaded: loaded (/usr/lib/systemd/system/containerd.service; enabled; preset: disabled)
     Active: active (running) since Sat 2025-06-28 18:03:25 PKT
       Docs: https://containerd.io
   Main PID: 1057 (containerd)
      Tasks: 21
     Memory: 28.5M
        CPU: 2.232s

kubectl version
kubectl version --client
Client Version: v1.31.1
Kustomize Version: v5.4.2

Minikube version
minikube version
minikube version: v1.36.0
commit: f8f52f5de11fc6ad8244afac475e1d0f96841df1-dirty

Kubernetes cluster info

kubectl get nodes

NAME                         STATUS   ROLES           AGE   VERSION
argo-cluster-control-plane   Ready    control-plane   28d   v1.33.1

kubectl cluster-info

Kubernetes control plane is running at https://127.0.0.1:45245
CoreDNS is running at https://127.0.0.1:45245/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

