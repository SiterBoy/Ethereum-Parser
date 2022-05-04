# Приложение для парсинга транзакций из блоков эфириума

## 1. Инициализация 

`npm i `

## 2. Конфигурация базы данных

Сконфигурировать базу данных необходимо в трех местах:
`/src/database/config.js`
`/src/app.module.ts`
`docker-compose.yml `( В том случае, если вы будете использовать контейнер докера для работы с базой данных)

3. Миграция 
`npm run db-start`  - скрипт создает базу данных и запускает миграции
`npm run db-second-start`  - скрипт удаляет базу данных, создает базу данных и запускает миграции

4. Запуск

4.1 Запуск докер контейнера с базой
(Если будет использоваться докер для postgres) - `docker compose up`

4.2 Запуск приложения
`npm run start:dev`

После выполнения старта приложения начнется парсинг транзакций из блоков. 
Первый блок для парсинга находится в переменной firstBlock по адресу src/transactions/tasks/tasks.service.ts
Последний текущий блок определяется автоматически

После завершения парсинга каждые 5 секунд будет проверяться изменился ли последний блок и если изменился - транзакции будут записываться в бд


5. Эндопоинт для получения кошелька с максимальным изменением баланса за последние 100 блоков
`/transactions`