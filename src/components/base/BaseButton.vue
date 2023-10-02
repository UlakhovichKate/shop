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

<style scoped lang="scss"></style>
