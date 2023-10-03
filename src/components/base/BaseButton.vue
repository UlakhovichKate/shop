<template>
  <button
    :type="buttonType"
    :class="buttonClass"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
  defineProps({
    buttonType: {
      type: String,
      default: 'button',
    },
    buttonClass: {
      type: String,
      default: 'button',
    },
    buttonText: {
      type: String,
      default: 'Submit',
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
