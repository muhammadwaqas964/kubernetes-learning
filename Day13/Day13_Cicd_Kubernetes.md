# 🚀 Day 13: CI/CD with Kubernetes using GitHub Actions

Welcome to **Day 13** of the Kubernetes learning journey! Today we built a **complete CI/CD pipeline** using **GitHub Actions** to:

* Build a Docker image from a Flask app
* Push it to Docker Hub
* Deploy the app to a Kubernetes cluster using `kubectl`

---

## 🎯 Goals

* Create a simple Python Flask app
* Write a Dockerfile to containerize the app
* Create Kubernetes deployment and service YAML files
* Set up GitHub Actions for CI/CD
* Automate build + push + deploy on `git push`

---

## 🧱 Folder Structure

```bash
Day13/
├── app/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
```

At the **repo root** (outside Day13):

```bash
.github/
└── workflows/
    └── deploy.yml
```

---

## 🧩 Step-by-Step Guide

### 1. ✅ Create the Flask App

\`\`

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Flask app on Kubernetes!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
```

\`\`

```
flask
```

\`\`

```Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]
```

To test locally:

```bash
cd Day13/app
docker build -t flask-test .
docker run -p 8080:80 flask-test
```

Visit: [http://localhost:8080](http://localhost:8080)

---

### 2. 📦 Kubernetes YAML Files

\`\`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-app
  labels:
    app: flask-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: flask-app
  template:
    metadata:
      labels:
        app: flask-app
    spec:
      containers:
      - name: flask-container
        image: muhammadwaqas366/flask-k8s-app:latest
        ports:
        - containerPort: 80
```

\`\`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: flask-service
  labels:
    app: flask-app
spec:
  type: NodePort
  selector:
    app: flask-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30050
```

To apply manually (for testing):

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

### 3. 🔐 GitHub Secrets

Go to **GitHub repo → Settings → Secrets and variables → Actions → New repository secret** and add:

* `DOCKER_USERNAME` → your Docker Hub username
* `DOCKER_PASSWORD` → your Docker Hub password

---

### 4. ⚙️ GitHub Actions Workflow

\`\` (this MUST be at repo root)

```yaml
name: CI/CD to Kubernetes

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Docker
      uses: docker/setup-buildx-action@v3

    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build & Push Docker Image
      run: |
        docker build -t ${{ secrets.DOCKER_USERNAME }}/flask-k8s-app:latest ./Day13/app
        docker push ${{ secrets.DOCKER_USERNAME }}/flask-k8s-app:latest

    - name: Setup kubectl
      uses: azure/setup-kubectl@v3

    - name: Deploy to Kubernetes
      run: |
        kubectl apply -f Day13/k8s/deployment.yaml
        kubectl apply -f Day13/k8s/service.yaml
```

---

## 🐳 Kubeconfig for GitHub Runner

> ⚠️ You must expose your cluster kubeconfig as a GitHub secret or manually deploy in local-only CI/CD scenarios (like Minikube).

In our case, we used manual `kubectl apply` to test locally instead of full GitHub kubectl automation.

---

## 🧪 Testing the Final Setup

```bash
kubectl get pods
kubectl get svc flask-service
```

Visit:

```bash
http://<minikube-ip>:30050
```

Get IP:

```bash
minikube ip
```

---

## ✅ Success!

You now have:

* Built a Docker image from code
* Pushed to DockerHub automatically
* Applied Kubernetes manifests
* Connected all via GitHub Actions

---

## 📝 Common Issues We Faced

| Issue                   | Solution                                           |
| ----------------------- | -------------------------------------------------- |
| Workflow not triggering | Make sure `.github/workflows/` is at the repo root |
| `nodePort` conflict     | Change port if already allocated                   |
| Wrong Docker path       | Use `./Day13/app` in workflow                      |
| No action tab showing   | Workflow file not detected due to wrong location   |

---

## 🏁 Final Commands Summary

```bash
# Test locally
cd Day13/app
docker build -t flask-test .
docker run -p 8080:80 flask-test

# Apply Kubernetes manually
kubectl apply -f Day13/k8s/deployment.yaml
kubectl apply -f Day13/k8s/service.yaml
```

---

Congratulations 🎉 — You’ve just built an end-to-end CI/CD pipeline for Kubernetes!

Next up: **Day 14 - Real World 3-Tier Application!**
