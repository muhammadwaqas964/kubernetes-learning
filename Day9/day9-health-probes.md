# 🩺 Day 9: Health Probes in Kubernetes

Kubernetes offers **Liveness** and **Readiness Probes** to automatically monitor and maintain application health.

---

## 🔍 What Are Probes?

| Probe Type    | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| **Liveness**  | Checks if the app is still alive. Restarts if it fails. |
| **Readiness** | Checks if the app is ready to receive traffic.          |

Probes help Kubernetes detect and react to application failures without manual intervention.

---

## 🧪 1. Liveness Probe

This example uses a simple BusyBox container. It creates a file `/tmp/healthy`, then deletes it after 30 seconds, simulating failure.

### 📄 `liveness-probe.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: liveness-demo
spec:
  containers:
    - name: app
      image: busybox
      args:
        - /bin/sh
        - -c
        - "touch /tmp/healthy; sleep 30; rm -f /tmp/healthy; sleep 600"
      livenessProbe:
        exec:
          command:
            - cat
            - /tmp/healthy
        initialDelaySeconds: 5
        periodSeconds: 5
```

### 📌 Commands:

```bash
kubectl apply -f liveness-probe.yaml
kubectl get pods
kubectl describe pod liveness-demo
```

You will see the pod restart once the liveness check fails.

---

## 🌐 2. Readiness Probe

The readiness probe checks if the container is ready to accept traffic. It prevents traffic routing until the check passes.

### 📄 `readiness-probe.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: readiness-demo
spec:
  containers:
    - name: app
      image: nginx
      readinessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 5
        periodSeconds: 10
```

### 📌 Commands:

```bash
kubectl apply -f readiness-probe.yaml
kubectl get pods
kubectl describe pod readiness-demo
```

---

## ✅ Summary

| Probe     | Use Case                       | Example Mode |
| --------- | ------------------------------ | ------------ |
| Liveness  | Detect crash and auto-restart  | `exec`       |
| Readiness | Prevent traffic to broken pods | `httpGet`    |

With probes, your apps become more self-healing and production-ready.


