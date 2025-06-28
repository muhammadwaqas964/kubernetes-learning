# 📘 Day 5: Services in Kubernetes

Kubernetes Services provide a stable way to communicate with Pods, even as Pods are created or destroyed. Services abstract the underlying Pod IPs and give a reliable endpoint.

---

## 🧠 Why Services?

Pods are ephemeral. Every time a Pod restarts or is recreated, its IP address changes. Services solve this by:

* Giving a **permanent DNS name** (e.g., `nginx-service`) to access Pods
* Providing **load balancing** across multiple Pod replicas
* Allowing external traffic to reach the cluster (NodePort/LoadBalancer)

---

## 🔗 Types of Kubernetes Services

| Type         | Access Scope        | Use Case                                      |
| ------------ | ------------------- | --------------------------------------------- |
| ClusterIP    | Internal cluster    | Default. Internal-only communication          |
| NodePort     | External access     | For development/testing via node IP           |
| LoadBalancer | External IP (cloud) | Production setups with external load balancer |

---

## 🛠 Step-by-Step Setup

### 1️⃣ Create a Deployment

**File:** `deployment-svc.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
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
          image: nginx
          ports:
            - containerPort: 80
```

Apply it:

```bash
kubectl apply -f deployment-svc.yaml
```

---

### 2️⃣ ClusterIP Service (default)

**File:** `service-clusterip.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Apply it:

```bash
kubectl apply -f service-clusterip.yaml
kubectl get service nginx-service
```

🔍 Internal pods can now access this service using `http://nginx-service`.

---

### 3️⃣ NodePort Service (external)

**File:** `service-nodeport.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30036   # Allowed range: 30000–32767
```

Apply:

```bash
kubectl apply -f service-nodeport.yaml
minikube service nginx-nodeport --url
```

This opens the nginx service in your **default browser** via Minikube.

---

### 4️⃣ Simulate LoadBalancer (Cloud Only)

In real cloud setups, a LoadBalancer service provisions a public IP. In Minikube:

```bash
minikube tunnel
```

Use in YAML:

```yaml
spec:
  type: LoadBalancer
```

This gives you a simulated external IP (view with `kubectl get svc`).

---

## 📷 Suggested Screenshots

* `kubectl get svc`
* Service opened in browser (NodePort)
* `minikube tunnel` (if LoadBalancer)

---

## 📁 Files Recap

* `deployment-svc.yaml`
* `service-clusterip.yaml`
* `service-nodeport.yaml`
* Screenshots in `Images/`

---

## ✅ Summary

* Use **ClusterIP** for internal communication (default)
* Use **NodePort** for development access from host machine
* Use **LoadBalancer** in production/cloud environments

Services make your Pods accessible and reliable, abstracting away internal IP changes.

## 🌐 Accessing Nginx via NodePort

When we run `minikube service nginx-nodeport --url`, we receive a URL like:
http://192.168.49.2:30036

Screenshot added in Images Directory
