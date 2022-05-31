# Console commands quick reference

## Kubectl

### Show kubertenees namespace list

```console
kubectl get namespace
```

### List services in the namespace

```console
 kubectl get services -n ingress-nginx
```

### Display list of pods

```console
kubectl get pods
```

### Execute command inside pod

```console
kubectl exec (POD | TYPE/NAME) [-c CONTAINER] [flags] -- COMMAND [args...] [options]

kubectl exec auth-depl-6c9f859c58-n6xph -it -- sh
```

## Docker
