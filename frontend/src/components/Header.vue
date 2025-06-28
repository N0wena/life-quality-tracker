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

// Используем типы из main.ts
type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
} | null;

const user = ref<TelegramUser>(null);

onMounted(() => {
  // Получаем данные пользователя из Telegram WebApp
  if (window.Telegram?.WebApp) {
    user.value = window.Telegram.WebApp.initDataUnsafe?.user || null;
  }
});
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-info {
  font-size: 0.9rem;
  opacity: 0.9;
}

.greeting {
  font-weight: 500;
}
</style> 
