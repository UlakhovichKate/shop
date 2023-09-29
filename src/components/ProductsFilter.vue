<template>
  <div class="filter">
    <div class="filter__inner">
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
      <button
        @click="resetFilters"
        class="filter__reset"
      >
        Reset all filters
      </button>
    </div>
  </div>
</template>

<script setup>
  import BaseFilter from '@/components/base/BaseFilter.vue';
  import BaseSearch from '@/components/base/BaseSearch.vue';
  import BaseInput from '@/components/base/BaseInput.vue';
  import {getAllCategories} from '@/api/apiProducts';
  import {ref, computed, watch} from 'vue';
  import {useFiltersStore} from '@/store/filters';

  const filtersStore = useFiltersStore();

  const props = defineProps({
    brands: {
      type: Object,
      required: true,
    },
    // minPrice: {
    //   type: Number,
    //   required: true,
    // },
    // maxPrice: {
    //   type: Number,
    //   required: true,
    // },
  });

  const emit = defineEmits(['filterBrand', 'filterCategory', 'filterSearch', 'resetFilters']);

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

  const minPrice = filtersStore.filterMinPrice;
  const maxPrice = filtersStore.filterMaxPrice;

  const resetFilters = () => {
    filterCategory.value = 'all';
    filterBrand.value = 'all';
    filterSearch.value = '';
    emit('resetFilters');
  };
</script>

<style lang="scss" scoped>
  .filter {
    max-width: 260px;
    width: 100%;

    &__inner {
      position: sticky;
      top: 50px;
    }

    &__price-title {
      margin: 0;
    }

    &__price-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    &__reset {
      margin-top: 50px;
      padding: 10px 20px;
      border: 2px solid #000;
      border-radius: 5px;
      background: #fff;
      color: #000;
      font-size: 16px;
      transition: all 0.5s;
      cursor: pointer;

      &:hover {
        background: #ccc;
      }
    }
  }
</style>
