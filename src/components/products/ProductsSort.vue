<template>
  <div class="sort">
    <div class="sort__title">Sort by</div>
    <select
      v-model="selected"
      @change="sortBy"
    >
      <option value="title">Title</option>
      <option value="reduce">Price reduce</option>
      <option value="increase">Price increase</option>
    </select>
  </div>
</template>

<script setup>
  import {ref} from 'vue';

  const emit = defineEmits(['sortBy']);
  const selected = ref('title');

  const sortBy = () => {
    switch (selected.value) {
      case 'title':
        return emit('sortBy', 'title');
      case 'reduce':
        return emit('sortBy', 'minPrice');
      case 'increase':
        return emit('sortBy', 'maxPrice');
      default:
        return emit('sortBy', 'title');
    }
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
