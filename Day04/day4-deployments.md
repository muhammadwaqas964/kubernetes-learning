# 📘 Day 4: Deployments, ReplicaSets, and Updates in Kubernetes

> A **Deployment** manages **ReplicaSets**, which in turn manage **Pods**.  
> This allows for easy updates, scaling, and rollback — production ready.

---

## 🔁 What Is a Deployment?

A **Deployment** is a Kubernetes object that:
- Maintains a desired number of **replicas** (Pods)
- Ensures zero downtime during updates
- Supports rollbacks
- Creates and manages **ReplicaSets**, which manage **Pods**

---

## 🧱 Structure Overview

A Deployment manages a ReplicaSet, and the ReplicaSet manages Pods.
Deployment
└── ReplicaSet
└── Pod(s)

- **Deployment**: Describes the desired state (how many pods, which image, etc.)
- **ReplicaSet**: Ensures the correct number of pods are running at any time
- **Pod(s)**: The actual containerized applications

> If the Deployment changes (e.g., image updated), it creates a **new ReplicaSet**, gradually spins up new Pods, and deletes old ones — this is a **rolling update**.



## 🛠️ Step 1: Create a Basic Deployment

### 📄 `deployment-basic.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80

create it and then aply:
kubectl apply -f deployment-basic.yaml

check it:
kubectl get deployments
kubectl get rs
kubectl get pods

 Step 2: Perform a Rolling Update
We’ll update the Nginx version from 1.21 → 1.25.
deployment-update.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.25
          ports:
            - containerPort: 80


 Apply it:
kubectl apply -f deployment-update.yaml

Watch the rollout:
kubectl rollout status deployment nginx-deployment

💡 Or:
kubectl get pods -w


## 🔍 Real Output: Rolling Update in Action

After applying an updated Deployment YAML (with a new image tag), Kubernetes:

- Created a **new ReplicaSet**: `nginx-deployment-55d67f7b54`
- Is launching new Pods under this ReplicaSet
- Keeps the **old Pods (764dd87c46)** running until the new Pods are ready
- This guarantees **zero downtime** for users

```bash
kubectl get all

Once the new pod becomes READY, Kubernetes will terminate the old ones, completing the rolling update.

You can also watch rollout:
kubectl rollout status deployment nginx-deployment


