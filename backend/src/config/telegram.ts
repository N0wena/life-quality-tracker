import dotenv from 'dotenv';

dotenv.config();

export const telegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  webhookUrl: process.env.TELEGRAM_WEBHOOK_URL,
  webAppUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Валидация обязательных переменных
export function validateTelegramConfig(): void {
  if (!telegramConfig.botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is required in environment variables');
  }

  console.log('✅ Telegram configuration loaded successfully');
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
} 
