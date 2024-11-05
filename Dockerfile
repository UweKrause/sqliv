FROM node:23-alpine

WORKDIR /app

RUN npm i -g serve

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
