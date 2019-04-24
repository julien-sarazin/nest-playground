FROM node:10.15.3

ARG MODE=dev
ENV MODE=$MODE

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

###
# Service configuration
#############################
ARG HOST='127.0.0.1'
ENV HOST=$HOST

ARG PORT=3000
ENV PORT=$PORT

ARG PROXY_HOST=$HOST
ENV PROXY_HOST=$PROXY_HOST

ARG PROXY_PORT=$PORT
ENV PROXY_PORT=$PROXY_PORT

###
# Consul client configuration
#############################
ARG CONSUL_HOST='127.0.0.1'
ENV CONSUL_HOST=$CONSUL_HOST

ARG CONSUL_PORT=8500
ENV CONSUL_PORT=$CONSUL_PORT

ARG CONSUL_HEALTH_CHECK=http://host.docker.internal:$PROXY_PORT/health
ENV CONSUL_HEALTH_CHECK=$CONSUL_HEALTH_CHECK

###
# Kong client configuration
#############################
ARG KONG_HOST='127.0.0.1'
ENV KONG_HOST=$KONG_HOST

ARG KONG_PORT=8001
ENV KONG_PORT=$KONG_PORT

ARG KONG_TARGET=host.docker.internal:$PROXY_PORT
ENV KONG_TARGET=$KONG_TARGET

ARG KONG_UPSTREAM='partners.upstream'
ENV KONG_UPSTREAM=$KONG_UPSTREAM

###
# MYSQL configuration
#############################
ARG MYSQL_HOST=localhost
ENV MYSQL_HOST=$MYSQL_HOST

ARG MYSQL_PORT=3033
ENV MYSQL_PORT=$MYSQL_PORT

ARG MYSQL_USERNAME=root
ENV MYSQL_USERNAME=$MYSQL_USERNAME

ARG MYSQL_PASSWORD=root
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

ARG MYSQL_DATABASE=partners_service_database
ENV MYSQL_DATABASE=$MYSQL_DATABASE

###
# Image setup
#############################
WORKDIR /workspace
COPY ./dist /workspace/
COPY ./package.json /workspace


RUN npm i


###
# Entrypoint
#############################
CMD ["npm", "run", "start:prod"]

EXPOSE $PORT
