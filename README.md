# Home Library Service

## Скачайте репозиторий локально

```
git clone {repository URL}
```

## Установите NPM модули

```
npm install
```

## Установите Docker 
Для запуска контейнеров должен быть установлен Docker:
- [Установка для Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Установка для Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Установка для Mac](https://docs.docker.com/desktop/install/mac-install/)

Запустите Docker как сервис после установки. 


## Запуск приложения
1. Установите переменные в .env файле или используйте текущие

2. Соберите приложение через docker compose выполнив команду:
```
docker compose build
```

3. Запустите приложение через docker compose выполнив команду:
```
docker compose up
```

## **ВАЖНО!**
Контейнер с nest приложением может запускать долго. Причина мне пока не понятна, к сожалению. 
У меня запуск nest приложения в контейнере занимал 5 - 10 минут. Пожалуйста, дождитесь запуска. 
В консоле в вашем терминале должны появится логи запущенного nest приложения. 

## Тестирование
Запустите тесты с помощью команды
```
npm run test
``` 

## Well-done! Graize mille и возьмите печеньку :)


## ДЛЯ ТЕСТИРОВАНИЯ КОНТЕНЕЙРОВ БЕЗ DOCKER-COMPOSE

## Создайте образ postgres с помощью команды
```
docker build -t postgres ./database
```

## Создайте сеть
```
docker network create -d bridge my-network
```

## Запустите postgres
```
docker run -dp 5432:5432 -e POSTGRES_PASSWORD=secret --network my-network postgres
```

## Скачайте образ и запустите с удалённого репозитория:
```
docker run -dp 4000:4000 --network my-network kalrsonru/node-web-app
```