<script setup lang="ts">
import { onMounted } from 'vue';
import Layout from './components/Layout.vue';

onMounted(() => {
  // Настройка темы Telegram
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    document.body.style.backgroundColor = tg.backgroundColor || '#ffffff';
    document.body.style.color = tg.textColor || '#000000';
  }
});
</script>

<template>
  <Layout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}
</style>
