# 💾 Day 7: Volumes & Persistent Storage in Kubernetes

Persistent storage is essential when you need data to survive Pod restarts. Kubernetes provides this through **Volumes**, **PersistentVolumes (PV)**, and **PersistentVolumeClaims (PVC)**.

---

## 📘 1. What is a Volume?

A volume is a directory accessible to containers in a Pod. It can persist data across container restarts within the Pod lifecycle.

* Ephemeral Volumes: `emptyDir`, `configMap`, etc. (destroyed when Pod is deleted)
* Persistent Volumes: survive Pod deletion (e.g., PVC + PV)

---

## 📦 2. PersistentVolume (PV) & PersistentVolumeClaim (PVC)

* **PV**: A cluster-wide storage resource (e.g., from local disk, NFS, cloud disk)
* **PVC**: A request for storage by a user/Pod

Kubernetes matches PVCs to available PVs.

---

## 🔧 3. Create a Persistent Volume

### 📄 `pv.yaml`

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

```bash
kubectl apply -f pv.yaml
```

---

## 📦 4. Create a Persistent Volume Claim

### 📄 `pvc.yaml`

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: local-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

```bash
kubectl apply -f pvc.yaml
```

Check:

```bash
kubectl get pv
kubectl get pvc
```

---

## 🚀 5. Use PVC in a Pod

### 📄 `pod-with-pvc.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: volume-demo
spec:
  containers:
    - name: app-container
      image: busybox
      command: ["sh", "-c", "echo Hello from volume > /data/hello.txt && sleep 3600"]
      volumeMounts:
        - mountPath: "/data"
          name: storage
  volumes:
    - name: storage
      persistentVolumeClaim:
        claimName: local-pvc
```

```bash
kubectl apply -f pod-with-pvc.yaml
```

---

## 🔍 6. Inspect Volume Data

```bash
kubectl exec -it volume-demo -- cat /data/hello.txt
```

Take a screenshot of the output for your repo.

---

## ✅ Summary

| Term     | Description                        |
| -------- | ---------------------------------- |
| Volume   | Directory shared with container    |
| PV       | Provisioned storage in the cluster |
| PVC      | Pod's request to claim a PV        |
| hostPath | Local machine path (for testing)   |

