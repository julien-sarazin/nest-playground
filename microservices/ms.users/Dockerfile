FROM node:10.15.3

ARG SERVICE_PORT=4040
ENV SERVICE_PORT=$SERVICE_PORT

RUN mkdir -p /service/src
WORKDIR /service/src

COPY . .

RUN yarn
RUN npm build

EXPOSE $SERVICE_PORT

CMD ["npm", "run", "start:prod"]
