FROM node:16

WORKDIR /node-express-practice
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE 8080
CMD npm start