import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';

dotenv.config();

// Глобальная переменная для Prisma Client (предотвращает множественные подключения)
declare global {
  var __db__: PrismaClient | undefined;
}

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  db = global.__db__;
}

export { db };

// Функция для проверки подключения к БД
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Функция для закрытия подключения
export async function closeDatabaseConnection(): Promise<void> {
  await db.$disconnect();
} 
