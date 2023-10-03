<template>
  <div class="layout">
    <the-header class="layout__header" />
    <div class="layout__main">
      <router-view />
      <a
        href="#app"
        class="layout__top"
        >to top</a
      >
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

    &__top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 5px 10px;
      background: #fff;
      color: #000;
      border: 1px solid #000;
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background: green;
      }
    }
  }
</style>
