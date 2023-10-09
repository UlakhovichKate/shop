<template>
  <div class="filter">
    <div class="filter__inner">
      <base-filter
        v-model:selected="activeFilters.category"
        :elements="categories"
        name="category"
        class="filter__block"
      />
      <base-filter
        v-model:selected="activeFilters.brand"
        :elements="brands"
        name="brand"
        class="filter__block"
      />
      <base-input
        v-model:value="activeFilters.search"
        type="search"
        title="Search by title"
        placeholder="Type something"
        class="filter__block"
      />
      <div class="filter__price price">
        <div class="price__grid">
          <base-input
            :min-value="minimumPrice"
            :max-value="maximumPrice"
            :placeholder="String(minimumPrice)"
            v-model:value="activeFilters.minPrice"
            type="number"
            title="Minimum price"
            class="price__input"
          />
          <base-input
            :min-value="minimumPrice"
            :max-value="maximumPrice"
            :placeholder="String(maximumPrice)"
            v-model:value="activeFilters.maxPrice"
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
  import {computed, reactive, ref, watch} from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseInput from '@/components/base/BaseInput.vue';

  const props = defineProps({
    products: {
      type: Object,
    },
  });

  const emit = defineEmits(['filters']);

  const products = computed(() => props.products);
  const categories = ref([]);
  const brands = ref([]);
  const minimumPrice = ref(null);
  const maximumPrice = ref(null);
  const filteredProducts = ref(products.value);

  const activeFilters = reactive({
    category: 'all',
    brand: 'all',
    search: '',
    minPrice: null,
    maxPrice: null,
  });

  const filters = [
    {
      key: 'category',
      value: ref(''),
      method: function (product) {
        return this.value === 'all' ? product.category.matchAll(`A-Za-z0-9_-/`) : product.category === this.value;
      },
    },
    {
      key: 'brand',
      value: ref(''),
      method: function (product) {
        return this.value === 'all' ? product.brand.matchAll(`A-Za-z0-9_-/`) : product.brand === this.value;
      },
    },
    {
      key: 'search',
      value: ref(''),
      method: function (product) {
        return product.title.toLowerCase().includes(this.value.toLowerCase());
      },
    },
    {
      key: 'minPrice',
      value: ref(0),
      method: function (product) {
        return this.value ? product.price >= Number(this.value) : true;
      },
    },
    {
      key: 'maxPrice',
      value: ref(0),
      method: function (product) {
        return this.value ? product.price <= Number(this.value) : true;
      },
    },
  ];

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

  const includeAllFilters = (product) => {
    let mapFilterMethods = filters.map((filter) => filter.method(product));
    if (allAreTrue(mapFilterMethods)) {
      return true;
    }
  };

  const allAreTrue = (arr) => arr.every((element) => element !== false);

  watch(activeFilters, (values) => {
    Object.entries(values).forEach((value) => {
      let activeFilter = filters.find((element) => element.key === value[0]);
      activeFilter.value = value[1];
    });

    filteredProducts.value = products.value.filter((product) => {
      if (includeAllFilters(product)) {
        return product;
      }
    });

    emit('filters', filteredProducts.value);
  });

  const resetFilters = () => {
    activeFilters.category = 'all';
    activeFilters.brand = 'all';
    activeFilters.search = '';
    activeFilters.minPrice = null;
    activeFilters.maxPrice = null;
    emit('filters', 'reset');
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
