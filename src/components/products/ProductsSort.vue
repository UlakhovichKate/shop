<template>
  <div class="sort">
    <div class="sort__title">Sort by</div>
    <select
      v-model="selected"
      @change="sortBy"
    >
      <option value="title">Title</option>
      <option value="minPrice">Price reduce</option>
      <option value="maxPrice">Price increase</option>
    </select>
  </div>
</template>

<script setup>
  import {ref} from 'vue';

  const emit = defineEmits(['sortBy']);
  const selected = ref('title');

  const sortBy = () => {
    return emit('sortBy', selected.value);
  };
</script>

<style scoped lang="scss">
  .sort {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 30px;
  }
</style>
