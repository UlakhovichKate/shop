<template>
  <div class="base-filter">
    <div class="base-filter__title">Filter by {{ name }}</div>
    <select
      :value="selected"
      @change="$emit('update:selected', $event.target.value)"
      class="base-filter__select"
    >
      <option value="all">All</option>
      <option
        v-for="(element, index) in elements"
        :key="index"
      >
        {{ element }}
      </option>
    </select>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    elements: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      default: 'all',
    },
  });

  defineEmits(['update:selected']);

  const elements = computed(() => props.elements);
</script>

<style lang="scss" scoped>
  .base-filter {
    margin-bottom: 40px;

    &__title {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 18px;
    }

    &__select {
      width: 100%;
      padding: 5px;
      font-size: 16px;
    }
  }
</style>
