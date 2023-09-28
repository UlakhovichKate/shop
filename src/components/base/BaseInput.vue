<template>
  <div class="base-input">
    <h4 class="base-input__title">{{ title }}</h4>
    <input 
      :value="value" 
      @input="$emit('update:value', $event.target.value)"
      type="number" 
      class="base-input__input"
    >
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped>
.base-input {
  &__title {
    font-size: 16px;
    font-weight: 400;
  }

  &__input {
    max-width: 50px;
    width: 100%;
    padding: 5px;
    font-size: 16px;
  }
}
</style>
