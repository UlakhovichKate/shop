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
    <div class="filter__price">
      <h3 class="filter__price-title">Filter by price</h3>
      <div class="filter__price-grid">
        <base-input
        v-model:value="minPrice"
        type="min"
        title="Minimum price"
      ></base-input>
      <base-input
        v-model:value="maxPrice"
        type="max"
        title="Maximum price"
      ></base-input>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseFilter from '@/components/base/BaseFilter.vue';
  import BaseSearch from '@/components/base/BaseSearch.vue';
  import BaseInput from '@/components/base/BaseInput.vue';
  import {getAllCategories} from '@/api/apiProducts';
  import {ref, computed, watch} from 'vue';

  const props = defineProps({
    brands: {
      type: Object,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    }
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

  const minPrice = computed(() => props.minPrice);
  const maxPrice = computed(() => props.maxPrice);
</script>

<style lang="scss" scoped>
  .filter {
    max-width: 260px;
    width: 100%;

    &__price-title {
      margin: 0;
    }

    &__price-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
