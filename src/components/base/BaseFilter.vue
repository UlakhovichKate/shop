<template>
  <div class="base-filter">
    <h3 class="base-filter__title">Filter by {{ name }}</h3>
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

    &__select {
      width: 100%;
      padding: 5px;
      font-size: 16px;
    }
  }
</style>
