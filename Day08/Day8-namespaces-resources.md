# 🧱 Day 8: Namespaces & Resource Limits in Kubernetes

In large Kubernetes clusters, it's important to isolate workloads and control resource usage. **Namespaces** and **ResourceQuotas/Limits** help achieve that.

---

## 🧭 1. What Are Namespaces?

Namespaces let you create logical environments (e.g., dev, staging, prod) within the same cluster.

### 🎯 Use Cases:

* Separate environments for teams/projects
* Isolate dev/test/prod workloads
* Control access (RBAC)

### 🔧 Create a Namespace

```bash
kubectl create namespace dev-team
```

```bash
kubectl get namespaces
```

---

## 🚀 2. Deploy App into a Namespace

### 📄 `nginx-in-namespace.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  namespace: dev-team
spec:
  containers:
    - name: nginx
      image: nginx
```

```bash
kubectl apply -f nginx-in-namespace.yaml
kubectl get pods -n dev-team
```

---

## 📊 3. Set Resource Limits

You can define how much **CPU** and **Memory** a container is allowed/requested to use.

### 📄 `pod-with-resources.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
  namespace: dev-team
spec:
  containers:
    - name: stress-container
      image: polinux/stress
      command: ["stress"]
      args: ["--cpu", "1", "--timeout", "600"]
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
```

```bash
kubectl apply -f pod-with-resources.yaml
kubectl describe pod resource-demo -n dev-team
```

---

## 📌 4. Optional: Add a ResourceQuota to Namespace

### 📄 `quota.yaml`

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-team-quota
  namespace: dev-team
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 512Mi
    limits.cpu: "2"
    limits.memory: 1Gi
```

```bash
kubectl apply -f quota.yaml
kubectl describe quota dev-team-quota -n dev-team
```

---


## ✅ Summary

| Concept       | Purpose                           |
| ------------- | --------------------------------- |
| Namespace     | Isolate workloads                 |
| ResourceQuota | Enforce limits on namespace usage |
| Requests      | Minimum guaranteed resource       |
| Limits        | Maximum allowed resource          |


