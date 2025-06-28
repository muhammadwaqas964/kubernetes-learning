# 📦 Day 6: ConfigMaps & Secrets in Kubernetes

Today we'll learn how to manage external configurations and sensitive data in Kubernetes using **ConfigMaps** and **Secrets**.

---

## 🧠 Why ConfigMaps & Secrets?

* 🔧 **ConfigMaps** allow you to decouple configuration artifacts from application images (non-sensitive data like environment variables, config files).
* 🔒 **Secrets** are designed to hold sensitive info like passwords, API keys, tokens, etc.

---

## 🧾 1. Create ConfigMap

### ✅ From Literal Values

```bash
kubectl create configmap app-config --from-literal=ENV=production --from-literal=APP_NAME=MyApp
```

### ✅ From File

```bash
# sample-config.txt
DB_HOST=localhost
DB_PORT=5432

kubectl create configmap db-config --from-env-file=sample-config.txt
```

### ✅ View ConfigMap

```bash
kubectl get configmaps
kubectl describe configmap app-config
```

---

## 🔧 2. Use ConfigMap in Pod

### 📄 `pod-with-configmap.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-demo
spec:
  containers:
    - name: app-container
      image: nginx
      env:
        - name: ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: ENV
  restartPolicy: Never
```

### 🚀 Apply It

```bash
kubectl apply -f pod-with-configmap.yaml
```

### 🔍 Inspect

```bash
kubectl exec -it configmap-demo -- printenv | grep ENV
```

---

## 🔐 3. Create Secrets

### ✅ From Literal Values

```bash
kubectl create secret generic app-secret --from-literal=API_KEY=abcd1234
```

### ✅ From File

```bash
kubectl create secret generic db-secret --from-env-file=secret.env
```

### 🔍 View Secrets (base64 encoded)

```bash
kubectl get secrets
kubectl describe secret app-secret
```

### ⚠️ Decode a Secret

```bash
kubectl get secret app-secret -o jsonpath='{.data.API_KEY}' | base64 --decode
```

---

## 🔧 4. Use Secret in Pod

### 📄 `pod-with-secret.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-demo
spec:
  containers:
    - name: app-container
      image: nginx
      env:
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: API_KEY
  restartPolicy: Never
```

### 🚀 Apply It

```bash
kubectl apply -f pod-with-secret.yaml
```

### 🔍 Inspect

```bash
kubectl exec -it secret-demo -- printenv | grep API_KEY
```

---

## ✅ Summary

| Feature    | ConfigMap                  | Secret                  |
| ---------- | -------------------------- | ----------------------- |
| Use for    | Non-sensitive configs      | Sensitive data          |
| Storage    | Plain text                 | base64-encoded          |
| Access in  | Pods via env or volume     | Pods via env or volume  |
| CLI Create | `kubectl create configmap` | `kubectl create secret` |

---

### 📸 Screenshot Tip

* Take screenshot of:

  * `kubectl get configmaps && kubectl describe`
  * `kubectl get secrets && describe`
  * The Pod environment variables (via `printenv` inside Pod)

📁 Save to: `Images

---

