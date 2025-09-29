FROM node:20.19.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node","index.js"]