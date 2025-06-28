# 🌐 Day 10: Kubernetes Networking

Understanding how networking works inside Kubernetes is crucial for deploying real-world applications. In this section, we cover **Pod-to-Pod communication**, **Services**, **DNS**, and **CNI plugins**.

---

## 🧭 1. Pod-to-Pod Communication

In Kubernetes, every Pod gets its own IP address, and all Pods in the same cluster can communicate with each other **by default**, regardless of the Node they are running on.

### ✅ Try It Yourself

```bash
kubectl run busybox --image=busybox --restart=Never -it -- /bin/sh
```

Inside the shell, try pinging another pod (get the IP using `kubectl get pod -o wide`):

```bash
ping <other-pod-ip>
```

---

## 📛 2. DNS in Kubernetes

Kubernetes runs a DNS service (usually **CoreDNS**) that allows internal name resolution.

### 🧪 Test DNS Resolution

Create an `nginx` pod:

```bash
kubectl run nginx --image=nginx
```

Then, from busybox pod:

```bash
nslookup nginx
```

You should see the ClusterIP of the `nginx` pod or service.

---

## 🔌 3. CNI Plugins (Container Network Interface)

CNI plugins provide network connectivity for Pods. Minikube typically uses **bridge** plugin by default. Others include:

* Calico
* Flannel
* Weave
* Cilium

You can inspect the CNI plugin being used with:

```bash
cat /etc/cni/net.d/*
```

(Requires access inside the minikube VM.)

---

## 📄 Sample YAML for Network Test

### 📁 `netshoot-pod.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: netshoot
spec:
  containers:
  - name: netshoot
    image: nicolaka/netshoot
    command: ["/bin/bash", "-c", "sleep 3600"]
```

### 🚀 Run & Inspect

```bash
kubectl apply -f netshoot-pod.yaml
kubectl exec -it netshoot -- bash
```

Inside:

```bash
curl http://nginx
ping nginx
```

---


## ✅ Summary

| Concept    | Description                                 |
| ---------- | ------------------------------------------- |
| Pod IP     | Each Pod has a unique IP within the cluster |
| DNS        | Internal service discovery                  |
| CNI Plugin | Manages Pod network configuration           |
| Service    | Provides stable networking for Pods         |


