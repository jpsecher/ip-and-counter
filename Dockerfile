FROM node:alpine
COPY webserver.js .
EXPOSE 8080
CMD ["node", "webserver.js"]
