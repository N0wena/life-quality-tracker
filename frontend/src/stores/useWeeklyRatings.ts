import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface WeeklyRating {
  id: string;
  user_telegram_id: bigint;
  week_start_date: Date;
  rating: number; // 1-5
  description?: string;
  media_urls: string[];
  created_at: Date;
  updated_at: Date;
}

export const useWeeklyRatingsStore = defineStore('weeklyRatings', () => {
  const ratings = ref<WeeklyRating[]>([]);
  const currentDate = ref(new Date());
  const currentYear = ref(new Date().getFullYear());
  const currentMonth = ref(new Date().getMonth());

  // Цветовая схема для оценок
  const getRatingColor = (rating: number): string => {
    const colors = {
      1: '#ef4444', // красный
      2: '#f97316', // оранжевый  
      3: '#eab308', // желтый
      4: '#84cc16', // светло-зеленый
      5: '#22c55e', // ярко-зеленый
    };
    return colors[rating as keyof typeof colors] || '#d1d5db';
  };

  // Получить начало недели (понедельник)
  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Понедельник
    return new Date(d.setDate(diff));
  };

  // Получить недели для отображения в календаре
  const getWeeksForMonth = computed(() => {
    const weeks: { 
      weekStart: Date; 
      rating?: WeeklyRating; 
      isCurrentWeek: boolean;
    }[] = [];
    
    const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
    const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
    
    // Начинаем с понедельника первой недели месяца
    let weekStart = getWeekStart(firstDayOfMonth);
    
    while (weekStart <= lastDayOfMonth) {
      const rating = ratings.value.find(r => 
        r.week_start_date.getTime() === weekStart.getTime()
      );
      
      const isCurrentWeek = getWeekStart(new Date()).getTime() === weekStart.getTime();
      
      weeks.push({
        weekStart: new Date(weekStart),
        rating,
        isCurrentWeek,
      });
      
      // Переходим к следующей неделе
      weekStart = new Date(weekStart);
      weekStart.setDate(weekStart.getDate() + 7);
    }
    
    return weeks;
  });

  // Навигация по месяцам
  const goToPreviousMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
  };

  const goToNextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    currentYear.value = now.getFullYear();
    currentMonth.value = now.getMonth();
  };

  // Добавить оценку
  const addRating = async (rating: Omit<WeeklyRating, 'id' | 'created_at' | 'updated_at'>) => {
    // TODO: API вызов
    const newRating: WeeklyRating = {
      ...rating,
      id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    ratings.value.push(newRating);
  };

  // Загрузить оценки пользователя
  const loadRatings = async (userTelegramId: bigint) => {
    // TODO: API вызов
    // Пока заглушка с тестовыми данными
    const mockRatings: WeeklyRating[] = [
      {
        id: '1',
        user_telegram_id: userTelegramId,
        week_start_date: getWeekStart(new Date()),
        rating: 4,
        description: 'Хорошая неделя',
        media_urls: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    ratings.value = mockRatings;
  };

  return {
    ratings,
    currentDate,
    currentYear,
    currentMonth,
    getWeeksForMonth,
    getRatingColor,
    getWeekStart,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    addRating,
    loadRatings,
  };
}); 
