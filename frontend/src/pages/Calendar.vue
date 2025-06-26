<template>
  <div class="calendar-page">
    <!-- Навигация по месяцам -->
    <div class="month-navigation">
      <button 
        class="nav-btn" 
        @click="store.goToPreviousMonth()"
        :aria-label="'Предыдущий месяц'"
      >
        ◀
      </button>
      
      <div class="current-month">
        <span class="month-year">{{ currentMonthName }} {{ store.currentYear }}</span>
      </div>
      
      <button 
        class="nav-btn" 
        @click="store.goToNextMonth()"
        :aria-label="'Следующий месяц'"
      >
        ▶
      </button>
    </div>

    <!-- Кнопка "Сегодня" -->
    <button 
      class="today-btn"
      @click="store.goToCurrentMonth()"
    >
      📅 Сегодня
    </button>

    <!-- Календарная сетка с неделями -->
    <div class="weeks-grid">
      <div 
        v-for="week in store.getWeeksForMonth" 
        :key="week.weekStart.getTime()"
        class="week-square"
        :class="{
          'has-rating': week.rating,
          'current-week': week.isCurrentWeek,
          'clickable': !week.rating || week.isCurrentWeek
        }"
        :style="{ 
          backgroundColor: week.rating ? store.getRatingColor(week.rating.rating) : undefined 
        }"
        @click="handleWeekClick(week)"
      >
        <div class="week-info">
          <div class="week-date">
            {{ formatWeekDate(week.weekStart) }}
          </div>
          
          <div v-if="week.rating" class="rating-info">
            <div class="rating-value">{{ week.rating.rating }}/5</div>
            <div v-if="week.rating.description" class="rating-description">
              {{ truncateText(week.rating.description, 20) }}
            </div>
          </div>
          
          <div v-else class="no-rating">
            <span v-if="week.isCurrentWeek">📝 Оценить</span>
            <span v-else>—</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Легенда цветов -->
    <div class="color-legend">
      <h3>Легенда оценок:</h3>
      <div class="legend-items">
        <div 
          v-for="rating in [1, 2, 3, 4, 5]" 
          :key="rating" 
          class="legend-item"
        >
          <div 
            class="legend-color" 
            :style="{ backgroundColor: store.getRatingColor(rating) }"
          ></div>
          <span class="legend-text">{{ rating }} - {{ getRatingText(rating) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useWeeklyRatingsStore } from '../stores/useWeeklyRatings';

const store = useWeeklyRatingsStore();

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const currentMonthName = computed(() => monthNames[store.currentMonth]);

const formatWeekDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month.toString().padStart(2, '0')}`;
};

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const getRatingText = (rating: number): string => {
  const texts = {
    1: 'Ужасно',
    2: 'Плохо', 
    3: 'Нормально',
    4: 'Хорошо',
    5: 'Отлично'
  };
  return texts[rating as keyof typeof texts];
};

const handleWeekClick = (week: any) => {
  if (week.isCurrentWeek) {
    // Открыть модал для оценки текущей недели
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert('Функция оценки недели будет доступна после подключения API');
    } else {
      alert('Функция оценки недели будет доступна после подключения API');
    }
  } else if (week.rating) {
    // Показать детали оценки
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(`Неделя ${formatWeekDate(week.weekStart)}\nОценка: ${week.rating.rating}/5\n${week.rating.description || ''}`);
    } else {
      alert(`Неделя ${formatWeekDate(week.weekStart)}\nОценка: ${week.rating.rating}/5\n${week.rating.description || ''}`);
    }
  }
};

onMounted(() => {
  // Загрузить данные пользователя
  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    store.loadRatings(BigInt(window.Telegram.WebApp.initDataUnsafe.user.id));
  }
});
</script>

<style scoped>
.calendar-page {
  max-width: 100%;
  margin: 0 auto;
}

.month-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 8px;
}

.nav-btn {
  background: var(--tg-theme-button-color, #2481cc);
  color: var(--tg-theme-button-text-color, white);
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.nav-btn:hover {
  opacity: 0.8;
}

.current-month {
  flex: 1;
  text-align: center;
}

.month-year {
  font-size: 18px;
  font-weight: 600;
  color: var(--tg-theme-text-color, #000000);
}

.today-btn {
  background: var(--tg-theme-secondary-bg-color, #f8f9fa);
  color: var(--tg-theme-text-color, #000000);
  border: 1px solid var(--tg-theme-hint-color, #e5e7eb);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
}

.weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.week-square {
  aspect-ratio: 1;
  border: 2px solid var(--tg-theme-hint-color, #e5e7eb);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.2s;
  background: var(--tg-theme-secondary-bg-color, #f8f9fa);
}

.week-square.has-rating {
  color: white;
  font-weight: 500;
  border-color: transparent;
}

.week-square.current-week {
  border-color: var(--tg-theme-button-color, #2481cc);
  border-width: 3px;
}

.week-square.clickable {
  cursor: pointer;
}

.week-square.clickable:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.week-info {
  width: 100%;
}

.week-date {
  font-size: 12px;
  margin-bottom: 4px;
  opacity: 0.8;
}

.rating-value {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.rating-description {
  font-size: 10px;
  opacity: 0.9;
  line-height: 1.2;
}

.no-rating {
  font-size: 12px;
  color: var(--tg-theme-hint-color, #6b7280);
}

.color-legend {
  background: var(--tg-theme-secondary-bg-color, #f8f9fa);
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
}

.color-legend h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--tg-theme-text-color, #000000);
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 100px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--tg-theme-hint-color, #e5e7eb);
}

.legend-text {
  font-size: 11px;
  color: var(--tg-theme-text-color, #000000);
}

@media (max-width: 320px) {
  .weeks-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .week-square {
    padding: 8px;
  }
  
  .month-year {
    font-size: 16px;
  }
}
</style> 
