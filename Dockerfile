FROM node:18.14-alpine
WORKDIR /usr/app/

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 80
CMD ["npm", "start"]
