<template>
  <button :type=type class="button"><slot /></button>
</template>

<script setup>
  defineProps({
    type: {
      type: String,
      default: 'button',
    },
  });
</script>

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
