<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div class="products">
        <div v-for="product in products" :key="product.id">
          <img :src="product.thumbnail" :alt="product.title">
          <h2><a :href="`/products/` + product.id">{{ product.title }}</a></h2>
          <div>{{ product.price }} $</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getAllProducts} from '@/api/apiProducts';

const products = ref([]);

const getProducts = async () => {
  try {
    products.value = (await getAllProducts()).data.products;
    console.log(products.value)
  } catch (e) {
    console.log(e);
  }
};

getProducts();
</script>

<style lang="scss" scoped>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px 25px;
}
</style>
