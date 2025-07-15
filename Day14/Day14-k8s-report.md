# Day 14 - Kubernetes DevOps Academy Project Report

## ✅ Project Overview

This report documents the successful deployment of a full-stack DevOps Academy web application using Kubernetes. The app has a frontend built with Vite + React and a backend built with Express (TypeScript), bundled with Bun and deployed using Docker.

## 📌 Prerequisites Before Starting

To work on a similar real-time project, ensure the following:

* ✅ **Install Kubernetes tools:**

  * `kubectl`
  * `minikube` or any local Kubernetes cluster
* ✅ **Install Docker** for building container images
* ✅ **Install Bun** for dependency management and TypeScript bundling:

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
* ✅ **Domain setup**:

  * Use `/etc/hosts` to route `devops.local` → `127.0.0.1`
  * Ingress controller must be installed (like NGINX)
* ✅ **Basic knowledge**:

  * YAML, Kubernetes services/deployments/ingress
  * Docker multi-stage builds
  * TypeScript, Express, React

## 🧱 Kubernetes Resources

### 🔧 Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: backend-ingress
spec:
  ingressClassName: nginx
  rules:
    - host: devops.local
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 80
```

### 🔧 ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: devops-config
data:
  NODE_ENV: production
```

### 🔐 Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: devops-secret
type: Opaque
data:
  DB_PASSWORD: bXlzZWNyZXRwYXNzd29yZA==
```

### ⚙️ Frontend Deployment & Service

```yaml
# frontend/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: muhammadwaqas366/devops-client:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
```

```yaml
# frontend/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

### ⚙️ Backend Deployment & Service

```yaml
# backend/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: muhammadwaqas366/devops-backend:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 5000
```

```yaml
# backend/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  type: ClusterIP
```

## 📦 Dockerfiles

### Dockerfile.server

```Dockerfile
FROM oven/bun:1.1.18-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server/index.js"]
```

### Dockerfile.client

```Dockerfile
FROM oven/bun:1.1.18-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile
COPY . .
RUN bun run build
WORKDIR /app/client
RUN bunx vite build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/server/public ./dist/server/public
COPY package.json ./
EXPOSE 5000
CMD ["node", "dist/server/index.js"]
```

## 🚨 Errors Faced & Resolutions

### ❌ Bun Build Errors

* **Error**: `Could not resolve: "../pkg" from lightningcss`

  * **Cause**: Missing `lightningcss` or related dependency in `node_modules`
  * ✅ **Fix**: Remove `node_modules`, `bun.lock`, reinstall dependencies

### ❌ Missing Vite/Nanoid/Plugins

* **Error**: `Could not resolve: vite / nanoid / @vitejs/plugin-react`

  * ✅ **Fix**: Run:

    ```bash
    bun add vite nanoid @vitejs/plugin-react @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer
    ```

### ❌ Broken imports during Docker build

* **Error**: `Cannot find module 'dist/server/index.js'`

  * ✅ **Fix**: Ensure `bun run build` compiles properly and outputs to `dist/`

### ❌ Express not working with Ingress

* **Issue**: Backend not accessible at `/api`

  * ✅ **Fix**: Ensure Ingress uses correct `host` and `path: /api`, and backend is listening on 0.0.0.0:5000

### ❌ React static files not served

* **Fix**:

  * Ensure Vite builds to `/client/dist`
  * Serve static files using `serveStatic(app)` in production

## ✅ Final Status

```bash
$ kubectl get all
NAME                                   READY   STATUS    RESTARTS        AGE
pod/devops-backend-78b668d9b5-qkk9m    1/1     Running   1 (3m42s ago)   19h
pod/devops-frontend-76b8c4c594-5ghwl   1/1     Running   1 (3m42s ago)   20h

NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/devops-backend    1/1     1            1           21h
deployment.apps/devops-frontend   1/1     1            1           21h
```

---

## 🧠 Summary

* ✅ Learned how to configure multi-service apps with Ingress, Services, and Deployments.
* ✅ Resolved Bun, TypeScript, and Vite build-time issues.
* ✅ Successfully deployed and accessed full-stack app using `devops.local` in browser.

> 🔁 This document serves as a full troubleshooting and deployment guide for your Day 14 Kubernetes full-stack deployment. Anyone following this can replicate your setup confidently.
