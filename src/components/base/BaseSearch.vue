<template>
  <div class="base-search">
    <h3 class="base-search__title">Filter by {{ name }}</h3>
    <input
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      type="search"
      placeholder="Search"
      class="base-search__input"
    />
  </div>
</template>

<script setup>
  defineProps({
    name: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped>
  .base-search {
    margin-bottom: 40px;

    &__input {
      width: 100%;
      padding: 5px;
      font-size: 16px;
    }
  }
</style>
