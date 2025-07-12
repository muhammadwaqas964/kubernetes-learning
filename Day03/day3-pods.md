# 📘 Day 3: Pods in Kubernetes & YAML Basics

> Today you'll learn how to define, deploy, and inspect **Pods** — the most fundamental object in Kubernetes.

---

## 🚀 What is a Pod?

A **Pod** is the **smallest deployable unit** in Kubernetes.

It represents:

- 🧱 One or more containers (usually one)
- 🔗 Shared network namespace (same IP and port space)
- 🗃️ Shared storage (e.g., emptyDir volumes)
- 🔄 Shared lifecycle — all containers start and stop together

> 💡 Think of a Pod as a "wrapper" around containers that run closely together.

---

## 🛠️ Method 1: Create a Pod Imperatively

Use the CLI to spin up a test pod:

```bash
kubectl run nginx-pod --image=nginx

Check the pod:

kubectl get pods
kubectl describe pod nginx-pod

Clean it up:

kubectl delete pod nginx-pod

🧪 kubectl run is useful for quick testing — but not used in production.

🧾 Method 2: Declarative Pod (YAML Manifest)
nginx-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx-container
      image: nginx
      ports:
        - containerPort: 80


Apply it:

kubectl apply -f nginx-pod.yaml
kubectl get pods


🔁 Multi-Container Pods (Sidecars)
Sometimes a Pod runs multiple containers — e.g., a main app + log forwarder.

multi-container-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-pod
spec:
  containers:
    - name: main-app
      image: busybox
      command: ['sh', '-c', 'while true; do echo Main container running; sleep 5; done']

    - name: sidecar
      image: busybox
      command: ['sh', '-c', 'while true; do echo Sidecar logging...; sleep 5; done']



Apply it:
kubectl apply -f multi-container-pod.yaml
kubectl get pods

Check logs:
kubectl logs multi-container-pod -c main-app
kubectl logs multi-container-pod -c sidecar

🧠 YAML Breakdown

| Field        | Purpose                             |
| ------------ | ----------------------------------- |
| `apiVersion` | Defines the Kubernetes API version  |
| `kind`       | Type of resource (`Pod`, `Service`) |
| `metadata`   | Resource name, labels, annotations  |
| `spec`       | Main configuration for the resource |
| `containers` | List of containers in the Pod       |


🔍 Inspecting Pods
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl exec -it <pod-name> -- sh

💬 kubectl exec lets you "enter" a running container and troubleshoot it.

📈 Pod Phases & Status

| Phase       | Meaning                                   |
| ----------- | ----------------------------------------- |
| `Pending`   | Pod accepted but not yet running          |
| `Running`   | At least one container is running         |
| `Succeeded` | All containers terminated successfully    |
| `Failed`    | One or more containers exited with error  |
| `Unknown`   | Node can’t be reached to determine status |


Check:
kubectl get pods
kubectl describe pod <pod-name>

🧪 Bonus: Port Forwarding to Pod
If your pod exposes a web service:

kubectl port-forward pod/nginx-pod 8080:80

Now access: http://localhost:8080


✅ Recap
Today you:

Created Pods using both kubectl run and YAML

Learned YAML structure for Pod definitions

Explored multi-container Pods and sidecars

Used kubectl logs, exec, and describe to inspect Pods

Understood Pod phases and lifecycle


