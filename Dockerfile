FROM node:14 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g pm2
RUN npm run build

CMD ["pm2-runtime", "start", "npm start dev"]