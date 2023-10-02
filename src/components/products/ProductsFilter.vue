<template>
  <div class="filter">
    <div class="filter__inner">
      <base-filter
        v-model:selected="filterCategory"
        :elements="categories"
        name="category"
      />
      <base-filter
        v-model:selected="filterBrand"
        :elements="brands"
        name="brand"
      />
      <base-search
        v-model:search="filterSearch"
        name="title"
      />
      <div class="filter__price price">
        <h3 class="price__title">Filter by price</h3>
        <div class="price__grid">
          <base-input-number
            v-model:value="minPriceFilter"
            :value="minPrice"
            @change="$emit('update:minPrice', Number($event.target.value))"
            type="min"
            title="Minimum price"
          />
          <base-input-number
            v-model:value="maxPriceFilter"
            :value="maxPrice"
            @change="$emit('update:maxPrice', Number($event.target.value))"
            type="max"
            title="Maximum price"
          />
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
  import BaseInputNumber from '@/components/base/BaseInputNumber.vue';
  import {ref, computed, watch} from 'vue';

  const props = defineProps({
    brands: {
      type: Object,
      required: true,
    },
    categories: {
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
    },
  });

  const emit = defineEmits(['filterBrand', 'filterCategory', 'filterSearch', 'resetFilters', 'update:minPrice', 'update:maxPrice']);

  const categories = computed(() => props.categories);
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

  const minPriceFilter = computed(() => props.minPrice);
  const maxPriceFilter = computed(() => props.maxPrice);

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

    .price {
      &__title {
        margin: 0;
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
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
