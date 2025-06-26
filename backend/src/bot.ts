import { Telegraf, Markup } from 'telegraf';
import { telegramConfig, validateTelegramConfig } from './config/telegram.js';

// Валидация конфигурации при запуске
try {
  validateTelegramConfig();
} catch (error) {
  console.error('❌ Telegram configuration error:', error);
  process.exit(1);
}

const bot = new Telegraf(telegramConfig.botToken!);

// Команда /start
bot.command('start', ctx => {
  const user = ctx.from;
  
  ctx.reply(
    `Добро пожаловать в Calendar Life Quality, ${user.first_name}! 📅\n\n` +
    'Это приложение поможет вам отслеживать качество вашей жизни по неделям.\n\n' +
    'Откройте приложение для управления вашим календарем:',
    Markup.inlineKeyboard([
      Markup.button.webApp('📱 Открыть приложение', telegramConfig.webAppUrl),
    ])
  );
});

// Обработка всех остальных сообщений
bot.on('message', ctx => {
  ctx.reply(
    'Используйте кнопку ниже для открытия приложения:',
    Markup.inlineKeyboard([
      Markup.button.webApp('📱 Открыть приложение', telegramConfig.webAppUrl),
    ])
  );
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('❌ Bot error:', err);
  ctx.reply('Произошла ошибка. Попробуйте позже.');
});

// Запуск бота
bot.launch()
  .then(() => {
    console.log('🤖 Telegram бот запущен успешно!');
  })
  .catch((err) => {
    console.error('❌ Ошибка запуска бота:', err);
    process.exit(1);
  });

// Graceful stop
process.once('SIGINT', () => {
  console.log('🛑 Остановка бота...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('🛑 Остановка бота...');
  bot.stop('SIGTERM');
});
