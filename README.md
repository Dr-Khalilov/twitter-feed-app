## Services

* `roach-0` - CockroachDB node
* `roach-1` - CockroachDB node
* `roach-2` - CockroachDB node
* `lb` - HAProxy acting as load balancer
* `roach-cert` - Holds certificates as volume mounts
* `main` - Backend app

## Getting started

> If you are using Google Chrome as your browser, you may want to navigate
> here `chrome://flags/#allow-insecure-localhost` and set this flag to `Enabled`.

1) because operation order is important, execute `./up.sh` instead of `docker compose up`
    - monitor the status of services via `docker-compose logs`
2) `docker compose ps`

### Open new tab terminal and run the command

```bash
 docker cp roach-0:/certs ./post-creators/
```

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
