# Tickets application

Based on stubhub.com. \
Platform for users selling their tickets for events (sports events, concerts, theater etc) to other users.\
Focus on ticketing aspect of application and its challenges.

- Users can list a ticket for an event for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When user attempts to puchase a ticket, the ticket is 'locked' for 15 minutes. The user has 15 minutes to enter their payment info.
- While locked, no other user can purchase this ticket. After 15 minutes the ticket should 'unlock'
- Ticket prices can be edited if they are not locked

## How to run application

### Prerequisites

- install Docker
- install Kubernetes inside docker
- install [NGINX Ingress Controller](hhttps://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

### NGINX Ingress command (no Helm)

```console
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml

```

### Generate secret for kubernetees

```console
kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
```

### Running application in Docker

From top level run following command in shell

```console
skaffold dev
```

### Building a single service

```console
docker build -t 'your-docker-id'/auth .
```

### Local connection

Setup your hosts file to redirect connections for ticketing.dev.local to localhost

```config
127.0.0.1 ticketing.dev.local
```

```console
http://ticketing.dev.local/api/users/currentuser
```

## Architecture & technologies

- Microservices
- Docker & Kubernetes
- Typescript
- Event bus using NATS streaming server
- MongoDB database
- Node with Express for Backend
- Client build with Next.js

## Services

- **auth** - everything related to user signup/singin/singout
- **tickets** - ticket creation/editing. Knows whether a ticket can be edited
- **orders** - order creation / editing
- **expiration** - watches for orders to be created, cancels them after 15 minutes
- **payments** - handles credit card payments, cancels orders if payments fails, completes if payment succeeds

## FAQ

1. **How to skip unskippable HTTPS warning in Chrome?**  
   Just click inside page with error and type `thisisunsafe`

## Stack

- Testing
  - [mongodb-memory-server](https://nodkz.github.io/mongodb-memory-server/)
  - [Supertest](https://github.com/visionmedia/supertest)
  - jest , ts-jest
