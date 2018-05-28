FROM node:8
WORKDIR /app
ADD server.js /app/
ENTRYPOINT node server.js