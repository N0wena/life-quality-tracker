<template>
  <div class="layout">
    <Header />
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

.main-content {
  padding: 0 16px 20px;
  max-width: 100%;
  overflow-x: hidden;
}
</style> 
