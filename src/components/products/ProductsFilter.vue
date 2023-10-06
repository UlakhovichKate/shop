<template>
  <div class="filter">
    <div class="filter__inner">
      <base-filter
        v-model:selected="filterCategory"
        :elements="categories"
        name="category"
        class="filter__block"
      />
      <base-filter
        v-model:selected="filterBrand"
        :elements="brands"
        name="brand"
        class="filter__block"
      />
      <base-input
        v-model:value="filterSearch"
        type="search"
        title="Search by title"
        placeholder="Type something"
        class="filter__block"
      />
      <div class="filter__price price">
        <div class="price__grid">
          <base-input
            :min-value="minimumPrice"
            :value="minimumPrice"
            @change="$emit('update:minPrice', Number($event.target.value))"
            type="number"
            title="Minimum price"
            class="price__input"
          />
          <base-input
            :max-value="maximumPrice"
            :value="maximumPrice"
            @change="$emit('update:maxPrice', Number($event.target.value))"
            type="number"
            title="Maximum price"
            class="price__input"
          />
        </div>
      </div>
      <base-button
        @click="resetFilters"
        class="filter__reset"
        >Reset all filters</base-button
      >
    </div>
  </div>
</template>

<script setup>
  import BaseFilter from '@/components/base/BaseFilter.vue';
  import {computed, ref, watch} from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseInput from '@/components/base/BaseInput.vue';

  const props = defineProps({
    products: {
      type: Object,
    },
  });

  const emit = defineEmits(['filterBrand', 'filterCategory', 'filterSearch', 'resetFilters']);

  const products = computed(() => props.products);
  const categories = ref([]);
  const brands = ref([]);
  const filterCategory = ref('all');
  const filterBrand = ref('all');
  const filterSearch = ref('');
  const minimumPrice = ref(0);
  const maximumPrice = ref(null);

  const getMinimumPrice = () => {
    return products.value.reduce((min, p) => (p.price < min ? p.price : min), products.value[0].price);
  };
  const getMaximumPrice = () => {
    return products.value.reduce((max, p) => (p.price > max ? p.price : max), products.value[0].price);
  };

  brands.value = [...new Set(products.value.map((el) => el.brand))];
  categories.value = [...new Set(products.value.map((el) => el.category))];
  minimumPrice.value = getMinimumPrice();
  maximumPrice.value = getMaximumPrice();

  watch(filterCategory, (selectedCategory) => {
    emit('filterCategory', selectedCategory);
  });

  watch(filterBrand, (selectedBrand) => {
    emit('filterBrand', selectedBrand);
  });

  watch(filterSearch, (searchInput) => {
    emit('filterSearch', searchInput);
  });

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

    &__block {
      margin-bottom: 40px;
    }

    .price {
      &__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    &__reset {
      margin-top: 50px;
      padding: 10px 20px;
      border: 2px solid #000;
      background: #fff;
      color: #000;
      font-size: 16px;

      &:hover {
        background: #000;
        color: #fff;
      }
    }
  }
</style>
