<template>
  <div class="base-input">
    <div
      v-if="title"
      class="base-input__title"
    >
      {{ title }}
    </div>
    <input
      :value="value"
      :type="type"
      :min="minValue"
      :max="maxValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :minlength="minLength"
      @input="$emit('update:value', $event.target.value)"
      class="base-input__input"
    />
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    minValue: {
      type: Number,
      default: null,
    },
    maxValue: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: null,
    },
    minLength: {
      type: Number,
      default: null,
    },
  });
</script>

<style lang="scss" scoped>
  .base-input {
    &__title {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 18px;
    }

    &__input {
      width: 100%;
      padding: 5px;
      font-size: 16px;
      box-sizing: border-box;
    }
  }
</style>
