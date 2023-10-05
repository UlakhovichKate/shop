<template>
  <button class="button"><slot /></button>
</template>

<script setup></script>

<style scoped lang="scss">
  .button {
    padding: 5px 10px;
    background: transparent;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
</style>
