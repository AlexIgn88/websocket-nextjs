Приложение на Next.JS

Показывает свою главную страницу, если пользователь открыл его через API.

Если зайти на главную страницу не через API - будет ошибка 404. 

В Next.JS добавлен endpoint /secret (https://websocket-nextjs.vercel.app/secret)

Этот endpoint требует параметр key (пароль). 
https://websocket-nextjs.vercel.app/secret?key=mypassword

Зайдя по такому адресу пользователя должно редиректнуть на основную страницу 
https://websocket-nextjs.vercel.app 

При этом у пользователя открывается Websocket соединение с приложением. 
В это соединение Next.JS направляет сообщение со значением key каждые 5 секунд.

Сохранены в .env файле в корне проекта. Сам файл исключен из проекта, но добавлен пустой env.example
DB_PARAMETER=key
DB_PASSWORD=mypassword