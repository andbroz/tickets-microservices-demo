## Routes

- `/api/tickets` Method `GET`
- `/api/tickets/:id` Method `GET`
- `/api/tickets` Method `POST` body: {title:string, price:string}
- `/api/tickets` Method `PUT` body: {title:string, price:string}
-

# some commands

## build docker image

```console
docker build -t andbroz/tickets .
```

### push image to docker

```console
docker push andbroz/tickets
```
