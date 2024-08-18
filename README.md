# Client Gateway
The gateway is the connection point between our clients and microservices.
It's responsible for handling requests, forwarding them appropriate microservices,  and returning
 responses to the clients.

## Dev

1. Clone the repository.
2. Install dependencies.
3. Create file `.env`based on `env.template`
4. Start Server NATS
```
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
5. Start the necessary microservices.
6. Start project with `npm run start: dev`

## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```


# PROD

Execute
```
docker build -f dockerfile.prod -t client-gateway .
```


