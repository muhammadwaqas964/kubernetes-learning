# 🧽 Day 12: Helm – Installing and Reusing Deployments

Welcome to Day 12 of the Kubernetes Learning Series!
Today’s goal was to learn **Helm**, the package manager for Kubernetes, and use it to deploy and manage **NGINX Ingress Controller**.

---

## 🌟 Objectives

* Install Helm (if not already)
* Add the official ingress-nginx Helm repo
* Install the `nginx-ingress` controller using Helm
* Understand Helm values customization
* Access the Ingress Controller via LoadBalancer using Minikube

---

## 📦 Helm Setup & Installation

```bash
# Add the Helm repo
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# Update repos
helm repo update

# List available versions
helm search repo ingress-nginx -l
```

---

## ❌ Issue 1: Reinstalling an existing release

### 🔍 Observation:

We already had an `nginx-ingress` release installed. Reinstalling would throw errors or result in duplicate resources.

### ✅ Solution:

We **uninstalled** the previous release before proceeding:

```bash
helm uninstall nginx-ingress -n ingress-nginx
```

---

## ✅ Installing the Ingress Controller

We chose version `4.11.7` to ensure stability and compatibility.

```bash
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --create-namespace \
  --namespace ingress-nginx \
  --set controller.ingressClassResource.name=nginx \
  --set controller.ingressClassResource.enabled=true \
  --set controller.ingressClass=nginx \
  --set controller.deployment.minReadySeconds=5 \
  --set controller.deployment.progressDeadlineSeconds=300 \
  --version 4.11.7
```

---

## 📡 Issue 2: External IP was `<pending>` (Minikube limitation)

### 🔍 Observation:

When running `kubectl get svc`, the external IP showed `<pending>`.

```bash
kubectl get service -n ingress-nginx nginx-ingress-ingress-nginx-controller
```

### ✅ Solution:

This is **expected** in Minikube. We used:

```bash
minikube tunnel
```

This created a tunnel and assigned an external IP to LoadBalancer-type services.

---

## 🟢 Verification

Check pod and service status:

```bash
kubectl get pods -n ingress-nginx -o wide
kubectl get service -n ingress-nginx nginx-ingress-ingress-nginx-controller -o wide
```

You should see:

* Pod in `Running` state
* External IP assigned to the LoadBalancer service

---

## ✅ Final Confirmation: Everything Working!

At this point:

* The NGINX Ingress Controller is installed
* A LoadBalancer service is exposing it
* Pods are running and healthy
* Tunnel is active for external access

---

## 🧪 Sample Ingress (Optional Testing)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example
  namespace: default
spec:
  ingressClassName: nginx
  rules:
    - host: foo.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app-service
                port:
                  number: 80
```

---

## 🧵 Summary of Final Commands

```bash
# Remove previous installation (if any)
helm uninstall nginx-ingress -n ingress-nginx

# Search for available versions
helm search repo ingress-nginx -l

# Install nginx-ingress via Helm
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --create-namespace \
  --namespace ingress-nginx \
  --set controller.ingressClassResource.name=nginx \
  --set controller.ingressClassResource.enabled=true \
  --set controller.ingressClass=nginx \
  --set controller.deployment.minReadySeconds=5 \
  --set controller.deployment.progressDeadlineSeconds=300 \
  --version 4.11.7

# Start the LoadBalancer tunnel (for Minikube)
minikube tunnel

# Check service and pod status
kubectl get service -n ingress-nginx nginx-ingress-ingress-nginx-controller -o wide
kubectl get pods -n ingress-nginx -o wide
```

---

## 🏁 Conclusion

You’ve learned how to:

* Use Helm for app installation
* Configure Ingress Controller using Helm values
* Work around LoadBalancer limitations in Minikube using `minikube tunnel`

Day 12 is now **successfully completed**! 🚀
