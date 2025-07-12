# 🚀 Day 2: Kubernetes Setup on Fedora (Minikube, kubectl, containerd)

> 📌 **OS Used:** Fedora 40  
> 🛠️ Goal: Set up a local Kubernetes cluster using:
- `containerd` → container runtime
- `kubectl` → Kubernetes CLI
- `Minikube` → Local single-node Kubernetes cluster

---

## 🔧 Prerequisites

Ensure your system has:

- ✅ Fedora 36+ (tested on Fedora 40)
- ✅ At least 2 CPUs, 2GB RAM, 20GB disk
- ✅ Virtualization enabled in BIOS/UEFI
- ✅ sudo/root access
- ✅ Internet access

Check virtualization support:
```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
# Output should be >= 1

📦 Step-by-Step Setup
🐳 Step 1: Install containerd
# Install dependencies
sudo dnf install -y yum-utils device-mapper-persistent-data lvm2

# Install containerd
sudo dnf install -y containerd

# Enable and start containerd
sudo systemctl enable --now containerd

# Check status
systemctl status containerd

🤖 Step 2: Install kubectl
# Download latest version
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Make executable
chmod +x kubectl

# Move to system path
sudo mv kubectl /usr/local/bin/

# Verify install
kubectl version --client

📎 If curl fails, download from: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

🔧 Step 3: Install Minikube

# Download Minikube binary
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install globally
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Check version
minikube version

🚀 Step 4: Start the Cluster (using containerd)
minikube start --container-runtime=containerd --driver=docker

This launches a local single-node Kubernetes cluster with containerd as the runtime.

🔍 Step 5: Verify Setup
minikube status
kubectl get nodes
kubectl cluster-info
You should see a "Ready" node and access to the control plane components.

🤔 Why containerd over Docker?
Containerd is:

✅ CNCF-compliant and production-grade

⚡ Lighter and faster than Docker

☁️ Used by cloud providers like GKE and EKS

Using containerd gives you a more realistic, production-aligned setup.

📊 What Does Minikube Do?
When you run minikube start, it:

Boots a local VM or container with Kubernetes

Installs control plane and worker components

Configures kubectl to point to the local cluster

Check context:
kubectl config current-context
kubectl config get-contexts

📂 Bonus: kubeconfig and CLI Tips
kubectl uses ~/.kube/config to manage clusters and users

Minikube sets this automatically during startup
kubectl config view

🎨 Minikube Dashboard
Launch the Kubernetes dashboard UI:

minikube dashboard

🌐 Exposing Services
minikube service <service-name>
kubectl port-forward pod/<pod-name> 8080:80


🧰 Helpful Minikube Commands
Command	Purpose
minikube stop	Stop the cluster
minikube delete	Delete the cluster
minikube logs	Debug failed startup
kubectl config get-contexts	View clusters & connections

📘 Verified Installation Logs (from my Fedora 40)
✅ containerd status
● containerd.service - containerd container runtime
     Loaded: loaded (/usr/lib/systemd/system/containerd.service; enabled)
     Active: active (running) since Sat 2025-06-28 18:03:25 PKT
       Docs: https://containerd.io
   Main PID: 1057 (containerd)
      Tasks: 21
     Memory: 28.5M
        CPU: 2.232s

✅ kubectl version
kubectl version --client
Client Version: v1.31.1
Kustomize Version: v5.4.2

✅ minikube version
minikube version
minikube version: v1.36.0
commit: f8f52f5de11fc6ad8244afac475e1d0f96841df1-dirty

✅ Recap
Today you learned how to:

Install containerd, kubectl, and Minikube

Bootstrap a local cluster on Fedora

Verify the cluster using CLI tools

Access the dashboard and forward ports

Understand kubeconfig and Minikube internals
