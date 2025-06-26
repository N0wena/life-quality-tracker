# Weekly Life Quality Tracker

Telegram бот + Mini App для трекинга качества прожитых недель.

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- Telegram Bot Token
- Supabase аккаунт (бесплатно)

### Установка

1. **Клонирование и установка зависимостей:**

```bash
git clone <repo-url>
cd calendar-life-qualiti-tg
npm install
```

2. **Настройка Supabase:**

- Создайте проект в [Supabase](https://supabase.com)
- Скопируйте DATABASE_URL из Settings > Database
- Создайте `.env` файл из `.env.example`

3. **Настройка окружения:**

```bash
cp .env.example .env
# Отредактируйте .env файл с данными Supabase и Telegram
```

4. **Миграции базы данных:**

```bash
npm run db:generate
npm run db:push
```

## 📁 Структура проекта

```
├── backend/               # Backend API + Telegram Bot
│   ├── src/
│   │   ├── bot.ts         # Telegram Bot код
│   │   ├── server.ts      # Express API сервер
│   │   ├── controllers/   # Контроллеры API
│   │   ├── models/        # Модели данных
│   │   ├── routes/        # API роуты
│   │   ├── middleware/    # Middleware функции
│   │   ├── utils/         # Утилиты
│   │   └── config/        # Конфигурации
│   └── dist/              # Скомпилированные файлы
├── frontend/              # Telegram Mini App (React + TypeScript)
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── pages/         # Страницы
│   │   ├── hooks/         # Пользовательские хуки
│   │   ├── utils/         # Утилиты
│   │   └── types/         # TypeScript типы
│   ├── public/            # Статические файлы
│   └── index.html         # HTML точка входа
├── prisma/                # База данных схема и миграции
├── dist/                  # Собранный frontend
├── .taskmaster/           # Task Master конфигурация
└── конфигурационные файлы
```

## 🛠 Команды разработки

### Backend

```bash
npm run backend:dev        # Запуск backend сервера (nodemon)
```

### Frontend

```bash
npm run dev               # Запуск Vite dev сервера
npm run build            # Сборка для продакшена
```

### База данных

```bash
npm run db:generate      # Генерация Prisma клиента
npm run db:push          # Применение изменений схемы к Supabase
npm run db:migrate       # Создание и применение миграций
npm run db:studio        # Prisma Studio (GUI для БД)
npm run db:reset         # Сброс БД и применение миграций
```

### Telegram Bot

```bash
npm run bot               # Запуск Telegram бота
npm run start:dev         # Запуск frontend + bot одновременно
```

### Код качество

```bash
npm run lint             # Проверка ESLint
npm run lint:fix         # Исправление ESLint ошибок
npm run format           # Форматирование Prettier
npm run type-check       # Проверка TypeScript типов
```

## 🗄 База данных

Используется PostgreSQL через Supabase с Prisma ORM.

### Основные таблицы:

- `Users` - Пользователи Telegram
- `WeeklyRatings` - Недельные оценки качества жизни

### Подключение:

```
Supabase автоматически предоставляет:
- PostgreSQL база данных
- Connection pooling
- Автоматические бэкапы
- Web UI для управления данными
```

## 🤖 Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Добавьте токен в `.env` файл
3. Запустите бота: `npm run bot`

## 🔧 Технологический стек

### Backend

- **Node.js** + **Express** - API сервер
- **TypeScript** - Типизация
- **Prisma** - ORM для работы с БД
- **Supabase** - PostgreSQL база данных в облаке
- **Telegraf** - Telegram Bot API

### Frontend (Mini App)

- **React** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик
- **Telegram WebApp SDK** - Интеграция с Telegram

### DevOps

- **Supabase** - Облачная PostgreSQL
- **ESLint** + **Prettier** - Качество кода
- **Task Master** - Управление задачами

## 📋 Task Master

Проект использует Task Master для управления задачами разработки.

### Основные команды:

```bash
# Просмотр задач через MCP в Cursor
# Или через CLI:
npx task-master-ai list    # Список задач
npx task-master-ai next    # Следующая задача
npx task-master-ai show 1  # Детали задачи
```

## 🚀 Деплой

### Разработка

```bash
npm run start:dev
```

### Продакшен

```bash
npm run build
# Настройка nginx, SSL, PM2 (см. задачу #11)
```

## 📄 Лицензия

MIT
