## Services

* `roach-0` - CockroachDB node
* `roach-1` - CockroachDB node
* `roach-2` - CockroachDB node
* `lb` - HAProxy acting as load balancer
* `roach-cert` - Holds certificates as volume mounts
* `intermediary` - Backend app - 1
* `post-creators` - Backend app -2
* `rabbitmq` - The broker of messages

## Getting started

> If you are using Google Chrome as your browser, you may want to navigate
> here `chrome://flags/#allow-insecure-localhost` and set this flag to `Enabled`.

1) because operation order is important, execute `./up.sh` instead of `docker compose up`
    - monitor the status of services via `docker-compose logs`
2) `docker compose ps`

### Open new tab terminal and run the command when nodes like roach-0, roach-1 and roach-2 start up

```bash
 docker cp roach-0:/certs ./post-creators/
```

## Rabbitmq

http:localhost:15672 - Admin panel for rabbitmq!
#### login - guest,
#### password - guest

### Enjoy it

### Open Interactive Shells

```bash
docker exec -it roach-0 /bin/bash
docker exec -it roach-1 /bin/bash
docker exec -it roach-2 /bin/bash
docker exec -it lb /bin/sh
# shell
docker exec -it roach-cert /bin/sh
# cli inside the container
cockroach sql --certs-dir=/certs --host=lb
# directly
docker exec -it roach-0 cockroach sql --certs-dir=/certs --host=lb
```
