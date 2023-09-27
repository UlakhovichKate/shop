<template>
  <div class="page page_product">
    <div class="page__content-wrapper">
      <div class="product">
        <div class="product__image">
          <img :src="product.thumbnail" :alt="product.title">
        </div>
        <div class="product__info">
          <h2 class="page__title">{{ product.title }}</h2>
          <div class="product__price">{{ product.price }} $</div>
          <div class="product__description">{{ product.description }}</div>
          <div class="product__brand">Brand: {{ product.brand }}</div>
          <div class="product__category">Category: {{ product.category }}</div>
          <div class="product__rating">{{ product.rating }}</div>
          <div class="product__awailability">
            <span v-if="product.stock > 0">In stock</span>
            <span v-else>Not in stock</span>
          </div>
          <button v-if="product.stock > 0" class="product__btn">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getProduct} from '@/api/apiProducts';
import { useRoute } from 'vue-router'

const product = ref([]);
const route = useRoute()

const getOneProduct = async () => {
  try {
    product.value = (await getProduct(route.params.productId)).data;
  } catch (e) {
    console.log(e);
  }
};

getOneProduct();
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
}
</style>
