# Nest playground

Welcome fellow developer!
This repository is a space dedicated to demonstrate how far a microservice architecture can be implemented with the NestJS framework.

The `master` branch will be stable and use the latest stable versions of the framework.   
The `stacks/*` branch will contain all experimental stacks (ie. consul+traefik, or consul+kong)

Once the model has been proven to be viable, we will be able to generate a starter template for any kind of microservices.


## Common setup

Install portainer to monitor your container.  
```
$ docker volume create portainer_data
$ docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer`
```


