# ChefApp
Веб приложение для поиска, обсуждения рецептов блюд.


Инструкция по запуску:
1. Установить XAMPP (https://www.apachefriends.org/ru/download.html)
2. Внутри XAMPP нажать "Start" у APACHE и MySQL
3. Перейти в http://localhost/phpmyadmin/ в браузере
4. Создать бд chefapp
5. Внутри бд создать таблицу "comments". Нажимаем на вкладку "SQL"
  Вот SQL команда для этого:
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

6. Нажимаем "Вперед"
7. Скачать этот репозиторий(убедиться что его имя "chefapp", иначе некоторые функции не будут выполнятся)
8. Переташить папку проекта ("chefapp") в папку "htdocs", которая внутри XAMPP
9. Открываем в браузере http://localhost/ChefApp/index.html

Функционал:
Можно искать рецепты по ключевым словам. Например "beef", "stake" и.т.д. Также имеется возможность оставлять комментарии под рецептами. Было решено не использовать логин и регистрацию так как это не критично для комментирования рецептов. 
