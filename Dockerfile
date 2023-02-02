FROM node:18.13.0-alpine3.16

RUN mkdir -p /app/images && chown -R node:node /app/images

WORKDIR /app

COPY package.json .

RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

RUN apk add --update --no-cache openssh 
RUN echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config
RUN echo -n 'node:node' | chpasswd
ENTRYPOINT ["./entrypoint.sh"]

RUN  npm install --omit=dev

COPY --chown=node:node . .

EXPOSE 22

COPY app.js entrypoint.sh ./