# Auth service

## Routes

- `/api/users/signup` Method `POST` , body: `{email : string, password: string}`
- `/api/users/signin` Method `POST` , body: `{email : string, password: string}`
- `/api/users/signout` Method `POST` , body: `{}`
- `/api/users/currentuser` Method `GET`

## Creating secret

```console
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mySecretKey
```

### List all secrets

```console
kubectl get secrets
```
