FROM node:16.14

WORKDIR /src

COPY package*.json ./
EXPOSE 4000

RUN npm install 

COPY . .

CMD ["npm", "start"]