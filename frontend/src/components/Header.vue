<template>
  <header class="header">
    <div class="header-content">
      <h1 class="title">📅 Life Quality Calendar</h1>
      
      <div v-if="user" class="user-info">
        <span class="greeting">Привет, {{ user.first_name }}! 👋</span>
      </div>
      
      <div v-else class="user-info">
        <span class="greeting">📱 Telegram Mini App</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const user = ref<any>(null);

onMounted(() => {
  // Получаем данные пользователя из Telegram WebApp
  if (window.Telegram?.WebApp) {
    user.value = window.Telegram.WebApp.initDataUnsafe?.user;
  }
});
</script>

<style scoped>
.header {
  background: var(--tg-theme-secondary-bg-color, #f8f9fa);
  border-bottom: 1px solid var(--tg-theme-hint-color, #e5e7eb);
  padding: 16px 0;
  margin-bottom: 20px;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--tg-theme-text-color, #000000);
}

.user-info {
  margin: 0;
}

.greeting {
  color: var(--tg-theme-hint-color, #6b7280);
  font-size: 14px;
  font-weight: 400;
}

@media (max-width: 320px) {
  .title {
    font-size: 18px;
  }
  
  .greeting {
    font-size: 13px;
  }
}
</style> 
