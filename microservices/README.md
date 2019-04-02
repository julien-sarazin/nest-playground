# Microservices

## Getting started

### The stack
The microservices are backed by a MySQL / Consul / Traefik Stack.
Before executing your microservices, please install :
 - Docker : https://docs.docker.com/install/
 
Then go to `shared/` and run `docker-compose -f stack.yml`

## Consul
Consul is used as service registry. 
To know more about consul please refer to the official documentation.

On mac, install consul with `bew install consul`  
Then start consul with `consul agent -dev -node machine -ui`  

To check what happens in consul go to http://localhost:8500

## Traefik
Traefik is used as Gateway (Reverse proxy + loadbalancer)
To know more about traefik please refer to the official documentation.

On mac, install traefik with `brew install traefik`  
Then start go to the shared directory `cd shared`  
Then start traefik with `traefik --loglevel=DEBUG`

### The realms
Each service are independent and can be run separably.

## Documentation
- To have a list of available HTTP endpoint :
    - https://documenter.getpostman.com/view/6810628/S17wN6Gs
    
- To learn more about the used framework : https://nestjs.com/

