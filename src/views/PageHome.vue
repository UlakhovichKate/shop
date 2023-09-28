<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div
        v-if="filteredProducts.length > 0"
        class="products"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <product-card :product="product"></product-card>
        </div>
      </div>
      <div v-else>Nothing to show</div>
      <products-filter
        :brands="brands"
        :min-price="minPrice"
        :max-price="maxPrice"
        @filter-brand="filterBrand"
        @filter-category="filterCategory"
        @filter-search="filterSearch"
      ></products-filter>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/ProductCard.vue';
  import ProductsFilter from '@/components/ProductsFilter.vue';

  const products = ref([]);
  const filteredProducts = ref([]);
  const minPrice = ref(0);
  const maxPrice = ref(0);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
      brands.value = [...new Set(products.value.map((el) => el.brand))];
      filteredProducts.value = products.value;
      minPrice.value = getMinimumPrice();
      maxPrice.value = getMaximumPrice();
    } catch (e) {
      console.log(e);
    }
  };

  const brands = ref([]);

  getProducts();

  const filterBrand = (brand) => {
    filteredProducts.value = brand === 'all' ? products.value : products.value.filter((product) => product.brand === brand);
  };

  const filterCategory = (category) => {
    filteredProducts.value = category === 'all' ? products.value : products.value.filter((product) => product.category === category);
  };

  const filterSearch = (search) => {
    filteredProducts.value = search === '' ? products.value : products.value.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
  };

  const getMinimumPrice = () => {
    return products.value.reduce((min, p) => (p.price < min ? p.price : min), products.value[0].price);
  };
  const getMaximumPrice = () => {
    return products.value.reduce((max, p) => (p.price > max ? p.price : max), products.value[0].price);
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
      order: 2;
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
</style>
