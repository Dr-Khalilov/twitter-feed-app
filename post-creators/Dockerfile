FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./src ./
CMD ['npm','run','start:dev']
