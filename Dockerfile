FROM node:18.13.0-alpine3.16

WORKDIR /app

COPY package.json .

RUN  npm install --omit=dev

COPY src ./src

CMD ["npm", "run", "start"]