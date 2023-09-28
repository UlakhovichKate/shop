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
      <products-filter :brands="brands"></products-filter>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/ProductCard.vue';
  import ProductsFilter from '@/components/ProductsFilter.vue';

  const products = ref([]);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
      brands.value = [...new Set(products.value.map((el) => el.brand))];
    } catch (e) {
      console.log(e);
    }
  };

  const brands = ref([]);

  getProducts();
</script>

<style lang="scss" scoped>
  .page {
    &__content-wrapper {
      display: grid;
      grid-template-columns: 1fr 300px;
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
