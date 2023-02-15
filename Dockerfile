FROM node:18.14-alpine
WORKDIR /usr/app/
VOLUME [ "I:/else/docker-volume" ]

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4000
ENV PORT=4000

CMD ["npm", "start:dev"]
