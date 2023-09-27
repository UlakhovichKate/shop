<template>
  <div class="layout">
    <the-header class="layout__header" />
    <div class="layout__main">
      <router-view />
    </div>
  </div>
</template>

<script setup>
  import TheHeader from '@/components/TheHeader.vue';
</script>

<style lang="scss" scoped>
  .layout {
    &__main {
      max-width: 1440px;
      margin: auto;
      padding: 50px 20px;
    }
  }
</style>
