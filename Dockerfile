
FROM node:24

WORKDIR /app

COPY back/ ./back/
COPY public/ ./public/

WORKDIR /app/back

RUN npm install

EXPOSE 3378

CMD ["node", "server.js"]
