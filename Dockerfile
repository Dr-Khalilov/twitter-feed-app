FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./src ./
EXPOSE 3000
CMD ['npm','run','start:dev']
