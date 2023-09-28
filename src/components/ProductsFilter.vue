<template>
  <div class="filter">
    <base-filter
      v-model:selected="filterCategory"
      :elements="categories"
      name="category"
    ></base-filter>
    <base-filter
      v-model:selected="filterBrand"
      :elements="brands"
      name="brand"
    ></base-filter>
    <base-search
      v-model:search="filterSearch"
      name="title"
    ></base-search>
  </div>
</template>

<script setup>
  import BaseFilter from '@/components/base/BaseFilter.vue';
  import BaseSearch from '@/components/base/BaseSearch.vue';
  import {getAllCategories} from '@/api/apiProducts';
  import {ref, computed, watch} from 'vue';

  const props = defineProps({
    brands: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(['filterBrand', 'filterCategory', 'filterSearch']);

  const categories = ref([]);

  const getCategories = async () => {
    try {
      categories.value = (await getAllCategories()).data;
    } catch (e) {
      console.log(e);
    }
  };

  getCategories();

  const brands = computed(() => props.brands);

  const filterCategory = ref('all');
  const filterBrand = ref('all');

  watch(filterCategory, (selectedCategory) => {
    emit('filterCategory', selectedCategory);
  });

  watch(filterBrand, (selectedBrand) => {
    emit('filterBrand', selectedBrand);
  });

  const filterSearch = ref('');

  watch(filterSearch, (searchInput) => {
    emit('filterSearch', searchInput);
  });
</script>

<style lang="scss" scoped>
  .filter {
    max-width: 260px;
    width: 100%;
  }
</style>
