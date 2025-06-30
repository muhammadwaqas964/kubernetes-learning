# 🌐 Day 11: Ingress Controller in Kubernetes

Today’s focus is on setting up an Ingress Controller (specifically NGINX) and using it to route traffic to multiple backend services inside the cluster.

---

## 🎯 Objectives

* Understand what an Ingress and Ingress Controller is
* Deploy NGINX Ingress Controller in Minikube
* Route traffic to different services via Ingress rules

---

## 📘 What is Ingress?

* **Ingress** is an API object that manages external access to services, typically over HTTP/HTTPS.
* It provides routing rules to access services based on paths or hostnames.
* Requires an **Ingress Controller** (e.g., NGINX, Traefik) to implement it.

---

## ⚙️ Step 1: Enable NGINX Ingress in Minikube

```bash
minikube addons enable ingress
```

Verify the ingress controller pod:

```bash
kubectl get pods -n ingress-nginx
```

---

## 🛠 Step 2: Create Two Sample Services (app1, app2)

Create 2 simple `Deployment` + `Service` pairs for `app1` and `app2`.

📄 `app1-deployment.yaml`
📄 `app2-deployment.yaml`

```yaml
# Sample content
apiVersion: v1
kind: Service
metadata:
  name: app1-service
spec:
  selector:
    app: app1
  ports:
    - port: 80
      targetPort: 80
```

Repeat for `app2` with different name/labels.

---

## 🌐 Step 3: Create Ingress Resource

📄 `ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - http:
      paths:
      - path: /app1
        pathType: Prefix
        backend:
          service:
            name: app1-service
            port:
              number: 80
      - path: /app2
        pathType: Prefix
        backend:
          service:
            name: app2-service
            port:
              number: 80
```

Apply the file:

```bash
kubectl apply -f ingress.yaml
```

---

## 🌍 Step 4: Access Ingress

Get the Minikube IP:

```bash
minikube ip
```

Now try in browser or curl:

```
http://<minikube-ip>/app1
http://<minikube-ip>/app2
```

---

## ✅ Verification

* Make sure both apps respond at different paths
* Use `kubectl describe ingress` to debug any issues

---
