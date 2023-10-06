<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div
        v-if="filteredProducts.length > 0"
        class="page__inner"
      >
        <products-sort @sort-by="sortBy" />
        <div class="products">
          <product-card
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
      <div
        v-else
        class="page__inner"
      >
        Nothing to show
      </div>
      <products-filter
        v-if="products.length > 0"
        :products="products"
        @filters="checkFilters"
      />
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/products/ProductsCard.vue';
  import ProductsFilter from '@/components/products/ProductsFilter.vue';
  import ProductsSort from '@/components/products/ProductsSort.vue';
  import sortByPrice from '@/helpers/sortByPrice';
  import sortByTitle from '@/helpers/sortByTitle';

  const products = ref([]);
  const filteredProducts = ref([]);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
      sortByTitle(products.value);
      filteredProducts.value = products.value;
    } catch (e) {
      console.log(e);
    }
  };

  getProducts();

  const checkFilters = (filter) => {
    if (filter === 'reset') {
      filteredProducts.value = products.value;
    } else {
      filteredProducts.value = filter;
    }

    sortBy(activeSortType.value);
  };

  const activeSortType = ref('title');

  const sortBy = (sortType) => {
    activeSortType.value = sortType;

    if (sortType === 'title') {
      sortByTitle(filteredProducts.value);
    } else if (sortType === 'minPrice') {
      sortByPrice(filteredProducts.value, 'min');
    } else {
      sortByPrice(filteredProducts.value, 'max');
    }
  };
</script>

<style lang="scss" scoped>
  .page {
    &__content-wrapper {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 60px;

      @media (max-width: 991px) {
        grid-template-columns: 1fr;
      }
    }

    &__inner {
      @media (max-width: 991px) {
        order: 2;
      }
    }
  }

  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px 30px;

    @media (max-width: 1260px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
</style>
