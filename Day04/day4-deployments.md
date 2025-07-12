# 📘 Day 4: Deployments, ReplicaSets & Rolling Updates in Kubernetes

> A **Deployment** is the most common way to manage Pods at scale. It provides:
- Declarative updates
- Versioned rollouts
- Zero-downtime updates
- Rollbacks and history tracking

---

## 🔁 What Is a Deployment?

A **Deployment** manages **ReplicaSets**, which in turn manage your Pods.

Visual:


Deployment
└── ReplicaSet (nginx-deployment-abc123)
└── Pod nginx-xxx
└── Pod nginx-yyy


When you update a Deployment:

- Kubernetes creates a **new ReplicaSet**
- Rolls out **new Pods** gradually
- Waits for them to be **Ready**
- Then **terminates old Pods**
- Ensures **zero downtime**

---

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


Apply it:
kubectl apply -f deployment-basic.yaml

Check:
kubectl get deployments
kubectl get rs
kubectl get pods
kubectl describe deployment nginx-deployment


🔄 Step 2: Perform a Rolling Update
Now update the image version from 1.21 to 1.25.

📄 deployment-update.yaml
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



Apply the update:

kubectl apply -f deployment-update.yaml

Watch it happen:

kubectl rollout status deployment nginx-deployment
kubectl get pods -w

🔍 Inspect What Happened
Check the ReplicaSets:
kubectl get rs

Kubernetes:

Created a new ReplicaSet (for v1.25)

Spun up new Pods

Waited until they were ready

Deleted old Pods from the previous ReplicaSet


🧯 Step 3: Rollback (Undo the Update)
Mistake in the new version? Roll back to the previous one:

kubectl rollout undo deployment nginx-deployment

You can also see rollout history:

kubectl rollout history deployment nginx-deployment

🔍 Bonus: Describe vs Get
Use kubectl describe to troubleshoot issues:

kubectl describe deployment nginx-deployment
kubectl describe rs
kubectl describe pod <pod-name>

This shows:

Events (e.g., pulling image, readiness probes failing)

Status transitions

Resource limits and configuration

📊 YAML Structure Breakdown
| Field      | Description                                 |
| ---------- | ------------------------------------------- |
| `replicas` | Number of Pods to maintain                  |
| `selector` | How the Deployment finds its Pods           |
| `template` | Blueprint for the Pod (`metadata` + `spec`) |
| `labels`   | Used by ReplicaSet to match Pods            |
| `image`    | Which container image to deploy             |
| `ports`    | Port exposed inside the Pod                 |


✅ Real CLI Output (Example)
# Old ReplicaSet (v1.21)
nginx-deployment-7bb7b6b5c6   0/2   Terminating

# New ReplicaSet (v1.25)
nginx-deployment-55d67f7b54   2/2   Running

Kubernetes waits for the new Pods to be Ready before removing old ones. This is what makes rolling updates safe and zero-downtime.


✅ Recap
Today you:

Created a Deployment to manage Pods

Updated your app version using kubectl apply

Watched a rolling update in action

Learned to inspect Pods, ReplicaSets, and Deployments

Rolled back to a previous version if needed


