/**
 * Утилиты для работы с датами и неделями
 */

/**
 * Получает дату начала недели (понедельник) для заданной даты
 * @param date - Исходная дата
 * @returns Дата понедельника той же недели
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

/**
 * Получает дату окончания недели (воскресенье) для заданной даты
 * @param date - Исходная дата
 * @returns Дата воскресенья той же недели
 */
export function getWeekEnd(date: Date): Date {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
}

/**
 * Получает дату начала текущей недели
 * @returns Дата понедельника текущей недели
 */
export function getCurrentWeekStart(): Date {
  return getWeekStart(new Date());
}

/**
 * Проверяет, находится ли дата в текущей неделе
 * @param date - Проверяемая дата
 * @returns true, если дата в текущей неделе
 */
export function isCurrentWeek(date: Date): boolean {
  const currentWeekStart = getCurrentWeekStart();
  const weekStart = getWeekStart(date);
  return currentWeekStart.getTime() === weekStart.getTime();
}

/**
 * Форматирует дату в строку для отображения
 * @param date - Дата для форматирования
 * @param locale - Локаль (по умолчанию 'ru-RU')
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date, locale = 'ru-RU'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Форматирует период недели в строку
 * @param weekStart - Дата начала недели
 * @param locale - Локаль (по умолчанию 'ru-RU')
 * @returns Строка вида "1 - 7 января 2024"
 */
export function formatWeekPeriod(weekStart: Date, locale = 'ru-RU'): string {
  const weekEnd = getWeekEnd(weekStart);
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const startFormatted = weekStart.toLocaleDateString(locale, { day: 'numeric' });
  const endFormatted = weekEnd.toLocaleDateString(locale, options);

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Получает массив дат начала недель для заданного месяца
 * @param year - Год
 * @param month - Месяц (0-11)
 * @returns Массив дат понедельников
 */
export function getWeeksInMonth(year: number, month: number): Date[] {
  const weeks: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const currentWeek = getWeekStart(firstDay);
  
  while (currentWeek <= lastDay) {
    weeks.push(new Date(currentWeek));
    currentWeek.setDate(currentWeek.getDate() + 7);
  }
  
  return weeks;
}

/**
 * Преобразует временную зону пользователя в дату с учетом локального времени
 * @param date - Исходная дата
 * @param timezone - Временная зона пользователя
 * @returns Дата с учетом временной зоны
 */
export function convertToUserTimezone(date: Date, timezone: string): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
} 
