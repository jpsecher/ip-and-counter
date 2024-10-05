FROM node:alpine3.19
COPY webserver.js .
EXPOSE 8080
ENTRYPOINT ["node", "webserver.js"]
