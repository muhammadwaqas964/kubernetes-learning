# 📘 Day 1: Introduction to Kubernetes & Containers

---

## 🔹 What is Kubernetes?

**Kubernetes (K8s)** is an open-source container orchestration platform that automates:

- 📦 Deployment of containerized applications
- 📈 Scaling applications up/down based on traffic
- 🔄 Self-healing & fault tolerance (restarts failed containers)
- 🌐 Service discovery and networking across containers

Kubernetes allows you to manage applications across **multiple machines (nodes)**, ensuring your services are always **available, scalable, and maintainable**.

> 💡 Think of Kubernetes as the “operating system for your containerized apps.” It controls how/when/where apps run in a **cluster**.

---

## 🔹 Containers vs Virtual Machines (VMs)

| Feature           | 🐳 Containers                          | 🖥️ Virtual Machines (VMs)            |
|-------------------|----------------------------------------|-------------------------------------|
| **Isolation**     | Process-level isolation (via namespaces) | Hardware-level isolation (full OS) |
| **Startup Time**  | ⚡ Seconds                              | 🕒 Minutes                          |
| **Performance**   | Near-native                            | Overhead from virtualized OS       |
| **Size**          | Lightweight (tens or hundreds of MBs)  | Heavy (gigabytes)                  |
| **Use Cases**     | Microservices, DevOps, CI/CD pipelines | Monolithic apps, full OS needs     |

> ✅ **Containers** run on a shared OS kernel and are perfect for microservices.  
> 🧱 **VMs** are better when you need full OS-level isolation, but they're heavier.

### 📌 Example

If you're running 10 Node.js apps:
- Using containers: You package each app with only what it needs (Node.js + app code).
- Using VMs: Each app would need a full OS + Node.js + app code — much larger footprint.

> **Docker** is the most widely used container platform for building, running, and managing containers.

---

## 🔹 Why Use Kubernetes?

Kubernetes simplifies running containerized applications at scale.

### Key Benefits:
- 🔁 **Rolling updates & rollbacks**  
  Update applications with no downtime.

- ⚖️ **Built-in load balancing**  
  Kubernetes distributes traffic across healthy containers.

- 📊 **Auto-scaling**  
  Scale up during peak traffic, scale down when idle.

- 🔧 **Self-healing**  
  Restart failed containers, replace unresponsive nodes.

- ☁️ **Cloud-agnostic**  
  Run Kubernetes on AWS, Azure, GCP, bare metal, or locally.

---

## 🔹 Kubernetes Architecture

Kubernetes has a **master-worker (control plane - data plane)** architecture.

---

### 🧠 Master Node (Control Plane)

Responsible for **managing** the cluster and making decisions.

| Component                | Purpose                                                                 |
|--------------------------|-------------------------------------------------------------------------|
| `kube-apiserver`         | The front-end for the control plane — handles all kubectl/API requests |
| `etcd`                   | Stores all cluster state in a key-value store                           |
| `kube-scheduler`         | Schedules pods to appropriate worker nodes                              |
| `kube-controller-manager`| Maintains the desired state (e.g., if a pod dies, spin up a new one)    |

> 🧠 The master node doesn’t run your applications — it **manages** the nodes that do.

---

### ⚙️ Worker Nodes (Data Plane)

Where your actual applications (pods) run.

| Component        | Description                                                       |
|------------------|-------------------------------------------------------------------|
| `kubelet`        | Talks to the API server, starts containers via container runtime |
| `kube-proxy`     | Manages network rules and load-balancing between pods             |
| Container Runtime| Docker, containerd, etc. — runs the actual containers              |
| **Pods**         | Smallest deployable unit in K8s. Contains 1+ containers.          |

---

### 📊 Visual Overview (ASCII Diagram)

```text
[User]
   ↓
[kubectl CLI]
   ↓
[API Server]
   ↓
 ┌───────────────┐
 │  Scheduler    │
 │  Controller   │
 │     etcd      │
 └───────────────┘
        ↓
+--------------------------+
|      Worker Nodes        |
|                          |
|   ┌───────────────┐      |
|   │   kubelet     │      |
|   │   kube-proxy  │      |
|   │   Containers   ─┐    |
|   │   (in Pods)    ─┘    |
|   └───────────────┘      |
+--------------------------+
