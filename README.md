# Home Library Service

## Запуск в контейнере 
У вас должен быть установлен Docker:
[Установка для Windows](https://docs.docker.com/desktop/install/windows-install/)
[Установка для Linux](https://docs.docker.com/desktop/install/linux-install/)
[Установка для Mac](https://docs.docker.com/desktop/install/mac-install/)

## 
Запустите Docker после установки

## 
Скачайте образ с помощью комнады
```
docker pull kalrsonru/node-web-app
```

## 
Для запуска контейнера введите команду и привяжите порты
```
docker run -dp 4000:4000 kalrsonru/node-web-app
```

##
Отправьте запрос из браузера на localhost:4000 


## Локальная установка

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application in development mode

```
npm run start:dev
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
