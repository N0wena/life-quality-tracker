import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { checkDatabaseConnection, closeDatabaseConnection } from './config/database.js';

// Загружаем переменные окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов за окно
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Базовый роут для проверки здоровья сервера
app.get('/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  
  res.status(dbStatus ? 200 : 503).json({
    status: dbStatus ? 'OK' : 'Error',
    database: dbStatus ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API роуты (будут добавлены позже)
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Обработка 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Глобальная обработка ошибок
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { error: err.message }),
    });
  }
);

// Функция запуска сервера
async function startServer() {
  try {
    // Проверяем подключение к БД
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      console.error('❌ Cannot start server: Database connection failed');
      process.exit(1);
    }

    // Запускаем сервер
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Получен сигнал SIGTERM, остановка сервера...');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Получен сигнал SIGINT, остановка сервера...');
  await closeDatabaseConnection();
  process.exit(0);
});

// Запускаем сервер
startServer();
