# Настройка деплоя фронтенда

## Автоматический деплой через GitHub Actions

Для настройки автоматического деплоя на GitHub Pages выполните следующие шаги:

### 1. Настройка GitHub Pages в репозитории

1. Перейдите в настройки вашего репозитория на GitHub
2. В разделе "Pages" выберите:
   - **Source**: GitHub Actions
   - **Build and deployment**: GitHub Actions

### 2. Workflow файл

GitHub Actions workflow уже настроен в файле `.github/workflows/deploy-frontend.yml`.

Деплой запускается автоматически при:
- Пуше в ветку `main` с изменениями в папке `frontend/`
- Pull request в ветку `main` с изменениями в папке `frontend/` (только сборка и тесты)
- Ручном запуске через GitHub Actions UI

### 3. Структура workflow

- **Build Job**: 
  - Установка Node.js 20
  - Установка зависимостей через `npm install` (корневой, с workspaces)
  - Линтинг и проверка форматирования через workspaces
  - Сборка проекта через `npm run build --workspace=frontend`
  - Подготовка артефактов для деплоя

- **Deploy Job**: 
  - Запускается только для ветки `main`
  - Деплой собранного приложения на GitHub Pages

### 4. URL для доступа

После успешного деплоя приложение будет доступно по адресу:
`https://[ваш-username].github.io/Calendar-life-qualiti-tg/`

### 5. Локальная разработка

Для локальной разработки используйте команды из корня проекта:

```bash
# Установка всех зависимостей (корневые + workspaces)
npm install

# Запуск только фронтенда
npm run frontend

# Запуск фронтенда и бэкенда одновременно  
npm run dev

# Сборка фронтенда
npm run build --workspace=frontend
```

### Примечания

- Проект использует **npm workspaces** - зависимости устанавливаются в корне
- В `vite.config.ts` настроен правильный базовый путь для production
- Файл `.nojekyll` предотвращает обработку через Jekyll
- Workflow включает проверку линтинга и форматирования перед деплоем
- Добавлена возможность ручного запуска workflow через GitHub UI
