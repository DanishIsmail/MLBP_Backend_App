FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run swagger-autogen
RUN npm run build

EXPOSE 6500

# Command to run your application
CMD ["npm", "start"]
