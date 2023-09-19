FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src/ .

EXPOSE 3333

CMD ["node", "index.js"]