# Настройка Calendar Life Quality Tracker

## Требования
- Node.js >= 18
- npm или yarn
- Supabase аккаунт

## Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корне проекта:

```env
# Supabase Configuration
DATABASE_URL="postgresql://username:password@host:port/database"
SUPABASE_URL="your_supabase_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_WEBHOOK_URL="your_webhook_url"

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"
```

### 3. Настройка Supabase
1. Создайте проект в [Supabase](https://supabase.com)
2. Получите URL и ключи из Settings > API
3. Обновите `DATABASE_URL` в `.env`

### 4. Настройка Telegram бота
1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен и добавьте в `TELEGRAM_BOT_TOKEN`
3. Настройте webhook URL для production

### 5. Настройка базы данных
```bash
# Генерация Prisma клиента
npm run db:generate

# Применение миграций
npm run db:push
```

### 6. Запуск разработки
```bash
# Запуск frontend и backend одновременно
npm start

# Или раздельно:
npm run dev      # Frontend (Vue)
npm run backend  # Backend (Express)
npm run bot      # Telegram bot
```

## Структура проекта

```
├── backend/          # Backend сервер (Express + TypeScript)
│   ├── src/
│   │   ├── config/   # Конфигурации
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
├── frontend/         # Frontend приложение (Vue + TypeScript)
├── prisma/           # Схема базы данных
└── .taskmaster/      # Управление задачами
```

## Полезные команды

```bash
npm run lint          # Проверка кода ESLint
npm run format        # Форматирование Prettier
npm run db:generate   # Генерация Prisma клиента
npm run db:push       # Применение изменений схемы
```

## Troubleshooting

### База данных не подключается
- Проверьте `DATABASE_URL` в `.env`
- Убедитесь, что Supabase проект активен
- Проверьте network connectivity

### Telegram бот не отвечает
- Проверьте `TELEGRAM_BOT_TOKEN`
- Убедитесь, что токен корректный
- Для production настройте webhook

### Frontend не подключается к backend
- Проверьте `FRONTEND_URL` в `.env`
- Убедитесь, что backend запущен на нужном порту
- Проверьте CORS настройки 
