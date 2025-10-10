# README

Этот файл содержит инструкции по установке и запуску веб-приложения на Django REST Framework как локально, так и через Docker.

---

## Содержание

- [Требования](#требования)  
- [Локальный запуск](#локальный-запуск)  
- [Запуск через Docker](#запуск-через-docker)   
- [Контакты](#контакты)  

---

## Требования

**Для локального запуска**  
- Python **3.12** (рекомендуемая версия)  
- PostgreSQL  

**Для запуска через Docker**  
- Docker Engine (>= 28.0)  
- Docker Compose (>= 2.34)  

---

## Локальный запуск

1. **Клонировать репозиторий**  
    ```bash
    git clone https://github.com/fSultan13/test-api.git
    cd marketplace-api
    ```

2. **Создать виртуальное окружение**  
    Рекомендуем использовать Python 3.12:
    ```bash
    python3.12 -m venv venv
    source venv/bin/activate    # Linux/MacOS
    venv\Scripts\activate       # Windows
    ```

3. **Создать файл окружения**  
    Скопируйте пример и заполните все необходимые переменные:
    ```bash
    cp .env.example .env
    ```

4. **Установить зависимости**
    ```bash
    pip install -r requirements.txt
    ```

5. **Настройка базы данных**
    ```bash
    python manage.py migrate
    python manage.py createsuperuser
    ```

6. **Запуск приложения и Celery**
    ```bash
    # Запустить Django-сервер
    python manage.py runserver
    ```

8. **Доступ к интерфейсам**
    - Админ-панель:  
      ```
      http://127.0.0.1:8000/admin/
      ```
    - Swagger UI (API-документация):  
      ```
      http://127.0.0.1:8000/api/docs/
      ```

---

## Запуск через Docker

1. **Клонировать репозиторий**
    ```bash
    git clone https://github.com/fSultan13/test-api.git
    cd marketplace-api
    ```

2. **Создать файл окружения**  
    Скопируйте пример:
    ```bash
    cp .env.example .env
    ```
    — и заполните все переменные так же, как при локальном запуске.

3. **Запустить контейнеры**
    ```bash
    docker-compose up --build -d
    ```

4. **Применить миграции и создать супер‑пользователя**
    ```bash
    # Создать супер‑пользователя
    docker-compose exec web python manage.py createsuperuser
    ```

5. **Остановить и удалить контейнеры**
    ```bash
    docker-compose down
    ```

6. **Доступ к интерфейсам**
    - Админ-панель:  
      ```
      http://127.0.0.1:8000/admin/
      ```
    - Swagger UI (API-документация):  
      ```
      http://127.0.0.1:8000/api/docs/
      ```

---

## Контакты

Султанов Фарид

Мой телеграм: [@fSultan13](https://t.me/fSultan13)

Моя почта: `f.sultanov105@gmail.com`
