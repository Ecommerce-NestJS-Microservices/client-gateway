# Cliente Gateway
The gateway is the contection point between our clients and microservices.
It's responsible for handling requests, forwarding them appropriate microservices,  and returning
 responses to the clients.

## Dev

1. Clone the repository.
2. Install depedencies.
3. Create file `.env`based on `env.template`
4. Start the necesary microservices.
5. Start proyect with `npm run start: dev`

## Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```


