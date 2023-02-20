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

