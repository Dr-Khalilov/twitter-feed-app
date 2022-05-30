FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
STOPSIGNAL SIGTERM
EXPOSE 3000
CMD ['npm','start']