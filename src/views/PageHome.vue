<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div class="products">
        <div
          v-for="product in products"
          :key="product.id"
        >
          <product-card :product="product"></product-card>
        </div>
      </div>
      <div class="filter">Filters</div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/ProductCard.vue';

  const products = ref([]);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
    } catch (e) {
      console.log(e);
    }
  };

  getProducts();
</script>

<style lang="scss" scoped>
  .page {
    &__content-wrapper {
      display: grid;
      grid-template-columns: 1fr 400px;
      grid-gap: 30px;
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
