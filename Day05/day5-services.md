# 📘 Day 5: Services in Kubernetes

> Kubernetes **Services** provide a stable way to access Pods, even as they are restarted or rescheduled.

---

## 🧠 Why Use Services?

Pods are **ephemeral** — their IPs change when recreated. Services solve this problem by:

- Giving a stable **DNS name** (e.g. `nginx-service`)
- Load balancing across Pod replicas
- Enabling **external access** to apps

---

## 🔗 Types of Kubernetes Services

| Type         | Exposed To       | Use Case                                     |
|--------------|------------------|----------------------------------------------|
| `ClusterIP`  | Internal only     | Default. Pod-to-Pod communication            |
| `NodePort`   | External (dev)    | Quick access from outside cluster            |
| `LoadBalancer`| External (cloud) | Production cloud environments (e.g. AWS ELB) |

---

## 🔧 Step-by-Step Example

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


Apply it:

kubectl apply -f deployment-svc.yaml

2️⃣ Create a ClusterIP Service (default)
File: service-clusterip.yaml

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

Apply it:

kubectl apply -f service-clusterip.yaml
kubectl get service nginx-service
kubectl describe service nginx-service

🔍 Internal pods can now access this service via:

curl http://nginx-service
✅ It resolves via internal DNS (nginx-service.default.svc.cluster.local)

3️⃣ Create a NodePort Service (external access)
File: service-nodeport.yaml

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
      nodePort: 30036   # Must be in range 30000–32767


Apply it:

kubectl apply -f service-nodeport.yaml
kubectl get svc nginx-nodeport

To access it from your browser:

minikube service nginx-nodeport --url
✅ This opens http://<minikube-ip>:30036 (e.g. http://192.168.49.2:30036)

4️⃣ Simulate LoadBalancer (Cloud-Like Access)

A LoadBalancer type service is used in cloud environments (e.g., AWS, GCP).

In Minikube, simulate it like this:

apiVersion: v1
kind: Service
metadata:
  name: nginx-lb
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80


Start a tunnel:

minikube tunnel

Then:

kubectl apply -f nginx-lb.yaml
kubectl get svc nginx-lb
You’ll now see an external IP field populated (e.g. 192.168.49.2). Use that in your browser.

📊 CLI Tools Recap
kubectl get svc
kubectl describe svc <service-name>
minikube service <service-name> --url


🔎 Visual (ASCII Diagram)
          ┌─────────────┐
          │  Clients    │
          └─────┬───────┘
                │
         +------+-------------+
         |   Service (NodePort)|
         |     nginx-nodeport |
         +------+-------------+
                │
        ┌───────┴────────┐
        │   Pods (nginx) │
        └────────────────┘

✅ Summary
Services make your Pods accessible and reliable

ClusterIP is for internal communication

NodePort exposes services outside the cluster

LoadBalancer creates external IP (cloud or simulated via minikube tunnel)


