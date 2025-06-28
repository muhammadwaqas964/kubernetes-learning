# 📘 Day 3: Pods in Kubernetes & YAML Basics

> 📌 This guide covers how to define, deploy, and inspect **Pods** using **YAML** and `kubectl`.

---

## 🚀 What is a Pod?

A **Pod** is the **smallest and simplest unit** in Kubernetes. It represents:

- A single instance of a running process in your cluster.
- One or more tightly coupled **containers** (e.g., sidecars).
- Shared network, IP, storage, and lifecycle.

> ✅ You typically deploy **one container per Pod**, but you can add more if they share resources (e.g., log shipper + app).

---

## 🛠️ Create a Pod Using kubectl (Imperative)

You can create a Pod directly using the CLI:

```bash
kubectl run nginx-pod --image=nginx

Check its status:
kubectl get pods
kubectl describe pod nginx-pod

Delete it:
kubectl delete pod nginx-pod
While kubectl run is good for testing, in production we use YAML manifests.

YAML Basics for Kubernetes
YAML (YAML Ain’t Markup Language) is used to define Kubernetes objects like Pods, Deployments, and Services.


