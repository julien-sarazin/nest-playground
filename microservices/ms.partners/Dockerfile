FROM node:10.15.3

ARG PORT=3000
ENV PORT=$PORT

#Todo : faire les autres env

WORKDIR /workspace
COPY ./dist /workspace/
COPY ./package.json /workspace

CMD ["npm", "run", "start:prod"]

EXPOSE $PORT
