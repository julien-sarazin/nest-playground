FROM node:10.15.3

ARG PORT=3000
ENV PORT=$PORT

#Todo : faire les autres env

WORKDIR /workspace
COPY . /workspace

RUN ["npm", "i"]
RUN ["npm", "build"]

CMD ["npm", "run", "start:prod"]

EXPOSE $PORT
