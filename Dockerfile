FROM node:lts-alpine
COPY webserver.js .
EXPOSE 8080
ENTRYPOINT ["node", "webserver.js"]
