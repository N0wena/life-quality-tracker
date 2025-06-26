import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создаем тестового пользователя
  const testUser = await prisma.users.upsert({
    where: { telegram_id: BigInt(123456789) },
    update: {},
    create: {
      telegram_id: BigInt(123456789),
      first_name: 'Тестовый',
      last_name: 'Пользователь',
      username: 'testuser',
      timezone: 'Europe/Moscow',
      settings: {
        notifications: true,
        reminderTime: '20:00',
      },
    },
  });

  console.log('✅ Создан тестовый пользователь:', testUser.first_name);

  // Создаем несколько тестовых оценок недель
  const weekStartDates = [
    new Date('2024-01-01'), // Понедельник
    new Date('2024-01-08'),
    new Date('2024-01-15'),
    new Date('2024-01-22'),
  ];

  const ratings = [5, 3, 4, 2];
  const descriptions = [
    'Отличная неделя! Все прошло по плану.',
    'Обычная неделя, без особых событий.',
    'Хорошая неделя, были интересные моменты.',
    'Сложная неделя, много проблем.',
  ];

  for (let i = 0; i < weekStartDates.length; i++) {
    await prisma.weeklyRatings.upsert({
      where: {
        user_telegram_id_week_start_date: {
          user_telegram_id: testUser.telegram_id,
          week_start_date: weekStartDates[i],
        },
      },
      update: {},
      create: {
        user_telegram_id: testUser.telegram_id,
        week_start_date: weekStartDates[i],
        rating: ratings[i],
        description: descriptions[i],
        media_urls: [],
      },
    });
  }

  console.log('✅ Созданы тестовые оценки недель');

  // Создаем еще одного пользователя
  const secondUser = await prisma.users.upsert({
    where: { telegram_id: BigInt(987654321) },
    update: {},
    create: {
      telegram_id: BigInt(987654321),
      first_name: 'Второй',
      last_name: 'Пользователь',
      username: 'seconduser',
      timezone: 'UTC',
    },
  });

  // Одна оценка для второго пользователя
  await prisma.weeklyRatings.upsert({
    where: {
      user_telegram_id_week_start_date: {
        user_telegram_id: secondUser.telegram_id,
        week_start_date: new Date('2024-01-01'),
      },
    },
    update: {},
    create: {
      user_telegram_id: secondUser.telegram_id,
      week_start_date: new Date('2024-01-01'),
      rating: 4,
      description: 'Great start of the year!',
      media_urls: [],
    },
  });

  console.log('✅ Создан второй пользователь и его оценка');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 
