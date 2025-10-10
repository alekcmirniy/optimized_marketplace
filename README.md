# Marketplace
<img width="402" height="859" alt="{AE858254-0349-49BC-9824-AABD677AF1E0}" src="https://github.com/user-attachments/assets/7f42b058-72ac-4271-aed7-5da2b7be6f0e" />

Кратко: Большой проект приложение-маркетплейс на Vue 3 + TypeScript.

## ✨ Возможности
- Просмотр товаров и категорий
- Фильтрация и сортировка
- Добавление товаров в корзину
- Модальные окна (категории, фильтры, вопросы)
- Навигация (главная, продукт, корзина, профиль, магазин, слайдеры)

## 🚀 Старт
```bash
git clone https://github.com/alekcmirniy/optimized_marketplace.git
cd optimized_marketplace
```
🐳 Запуск через Docker

1️⃣ Подготовьте окружение

Убедитесь, что установлены:

Docker & Docker Compose

Порты 5173 (frontend) и 8000 (backend) свободны

2️⃣ Поднять контейнеры

```bash
docker-compose up --build
```

3️⃣ После запуска

Frontend будет доступен по: http://localhost:5173

Backend (API) — http://localhost:8000

Остановить контейнеры:

```bash
docker-compose down
```

💻 Запуск локально (без Docker)

1️⃣ Frontend
```bash
cd optimized_marketplace

npm install

npm run dev
```

Он запустится по адресу http://localhost:5173
.

2️⃣ Backend (marketplace-api)
```bash
cd marketplace-api
```
Создать виртуальное окружение
```bash
python -m venv venv
```
Активировать виртуальное окружение

# Windows:
```bash
venv\Scripts\activate
```
# Linux / macOS:
```bash
source venv/bin/activate
```
Установить зависимости python
```bash
pip install -r requirements.txt
```
#Выполнить миграции
```bash
python manage.py migrate
```
Запустить сервер
```bash
python manage.py runserver
```

API будет доступен по http://localhost:8000

## 🛠 Технологии
- Vue 3 + TypeScript
- Vue Router
- Pinia (CartStore, ProductStore)
- Vite
- SCSS

## 📁 Структура (фрагмент)
```text
marketplace/
├── marketplace-api (набор конфигураций Backend базы данных магазина)
├── src/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── views/
│   └── App.vue
├── index.html
├── package.json
└── vite.config.ts
```

## 📄 Лицензия
MIT (см. LICENSE)

## 👨‍💻 Автор
Alexey Miroshnichenko (alekcmirniy)
