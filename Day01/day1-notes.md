# 📘 Day 1: Introduction to Kubernetes & Containers

---

## 🔹 What is Kubernetes?

**Kubernetes (K8s)** is an open-source container orchestration platform that automates:

- 📦 Deployment of containerized applications  
- 📈 Scaling applications up/down based on traffic  
- 🔄 Self-healing (restarts failed containers automatically)  
- 🌐 Service discovery & networking between containers  

Kubernetes acts like an **operating system for containerized apps**, managing when, where, and how containers run across a cluster of machines.

> 🧠 Kubernetes doesn’t run containers directly — it coordinates container runtimes like Docker or containerd.

---

## 🔹 Containers vs Virtual Machines (VMs)

| Feature              | 🐳 Containers                            | 🖥️ Virtual Machines (VMs)               |
|----------------------|------------------------------------------|------------------------------------------|
| Isolation            | Process-level (via namespaces, cgroups)  | Hardware-level (full OS per VM)          |
| Startup Time         | ⚡ Seconds                                | 🕒 Minutes                                |
| Performance          | Near-native                              | Overhead from full OS virtualization     |
| Size                 | Lightweight (MBs)                        | Heavy (GBs)                              |
| Use Cases            | Microservices, DevOps, CI/CD pipelines   | Legacy apps, full OS needs               |

✅ Containers share the host OS kernel and are ideal for lightweight, scalable microservices.

🧱 VMs provide stronger isolation but are bulkier and slower to provision.

---

### 📌 Real-world Example

Let’s say you want to run 10 Node.js applications:

- With **containers**: Each app shares the host OS, runs isolated with just the Node.js runtime it needs.
- With **VMs**: You’d need 10 full guest OSes, each running its own copy of Node.js.

💡 This is why containers are preferred for modern cloud-native architectures.

---

## 🔹 Why Use Kubernetes?

Kubernetes simplifies running containers **at scale** — especially in production.

### 🚀 Key Benefits:

- 🔁 **Rolling updates & rollbacks**  
  → Upgrade your app with zero downtime — and roll back if something breaks.

- ⚖️ **Load balancing**  
  → Kubernetes routes traffic to healthy containers using built-in service objects.

- 📊 **Auto-scaling**  
  → Automatically adjusts the number of containers based on CPU usage or traffic.

- 🔧 **Self-healing**  
  → Automatically replaces crashed containers or failed nodes.

- ☁️ **Cloud-agnostic**  
  → Run anywhere: AWS, Azure, GCP, on-prem, or even locally with Minikube.

---

### 📌 Real-World Scenario

> 🛒 Imagine your e-commerce app hits 10× traffic on Black Friday.
>
> Kubernetes scales up your services automatically, distributes traffic, and replaces any failed pods without human intervention.

---

## 🔹 Kubernetes Architecture

Kubernetes uses a **control plane–worker node** architecture.

---

### 🧠 Master Node (Control Plane)

Manages the overall cluster and makes scheduling decisions.

| Component             | Purpose                                                        |
|-----------------------|----------------------------------------------------------------|
| `kube-apiserver`      | Frontend for the control plane. All commands go through here.  |
| `etcd`                | Key-value store for the cluster's state                        |
| `kube-scheduler`      | Assigns pods to worker nodes                                   |
| `controller-manager`  | Enforces desired state (e.g., restarting failed pods)          |

> ⚠️ Note: In a production-grade cluster, these components are usually distributed across multiple master nodes for high availability.

---

### ⚙️ Worker Nodes (Data Plane)

This is where your applications actually run.

| Component          | Purpose                                                     |
|--------------------|-------------------------------------------------------------|
| `kubelet`          | Communicates with API server, launches containers           |
| `kube-proxy`       | Manages networking and forwards traffic to appropriate pods |
| Container Runtime  | e.g. Docker, containerd — actually runs your containers     |
| Pods               | The smallest deployable unit in Kubernetes (can hold 1+ containers) |

---

### 📊 Simplified Diagram

┌─────────────────────────────────────────────────────────────┐
│ Control Plane │
│ │
│ ┌────────────┐ ┌────────────────┐ ┌─────────────────┐ │
│ │ kube-apiser│←→│ controller-mgr │←→│ kube-scheduler │ │
│ └────────────┘ └────────────────┘ └─────────────────┘ │
│ ↓ ↑ │
│ etcd (Cluster State Store) │ │
└───────────────┬───────────────────┴─────────────────────────┘
↓
┌──────────────────────────────┐
│ Worker Node │
│ ┌──────────────┐ │
│ │ kubelet │ │
│ └──────┬───────┘ │
│ ↓ │
│ ┌──────────┐ │
│ │ Pod │──Container │
│ └──────────┘ │
│ ┌──────────────┐ │
│ │ kube-proxy │ │
│ └──────────────┘ │
└──────────────────────────────┘



> ⚠️ This is a conceptual diagram — some components run as pods, others as services or binaries, and the architecture varies across managed vs self-hosted clusters.

---

## 🔹 Bonus Concepts You Should Know

### 📁 Manifests (YAML)
Kubernetes resources like pods, deployments, and services are usually defined in **YAML files** called *manifests*.

Example:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: app
    image: nginx


🗂️ Namespaces
Used to logically separate workloads (e.g., dev, staging, prod) within the same cluster.

kubectl get pods -n kube-system


🔹 Basic kubectl Commands

kubectl get nodes             # List all nodes
kubectl get pods -A           # List all pods in all namespaces
kubectl describe pod <name>   # View detailed info about a pod


✅ Recap
Today you learned:

What Kubernetes is and how it helps manage containerized apps

The key differences between containers and VMs

The architectural components of Kubernetes

Real-world benefits like self-healing and scalability

Basic command-line tools and concepts to get started

