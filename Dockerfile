FROM node:18.14-alpine
WORKDIR /usr/app/
VOLUME [ "I:\Volume" ]

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4000
ENV PORT=4000

ENTRYPOINT ["npm", "run", "start:prod"]
