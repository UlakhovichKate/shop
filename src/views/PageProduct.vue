<template>
  <div class="page page_product">
    <div class="page__content-wrapper">
      <div class="product">
        <div class="product__image">
          <img
            :src="product.thumbnail"
            :alt="product.title"
          />
        </div>
        <div class="product__info">
          <h2 class="product__title">{{ product.title }}</h2>
          <div class="product__price">{{ product.price }} $</div>
          <div class="product__description">{{ product.description }}</div>
          <div class="product__brand">Brand: {{ product.brand }}</div>
          <div class="product__category">Category: {{ product.category }}</div>
          <product-rating
            :rating="product.rating"
            class="product__rating"
          />
          <div class="product__availability">
            <span v-if="product.stock > 0">In stock</span>
            <span v-else>Not in stock</span>
          </div>
          <base-button
            v-if="product.stock > 0"
            @click="addToCart"
            class="product__button"
            >Add to cart</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, watch} from 'vue';
  import {getProductById} from '@/api/apiProducts';
  import {useRoute} from 'vue-router';
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';
  import ProductRating from '@/components/product/ProductRating.vue';

  const route = useRoute();

  const product = ref([]);
  const cartStore = useCartStore();

  const getProduct = async () => {
    try {
      product.value = (await getProductById(route.params.productId)).data;
    } catch (e) {
      console.log(e);
    }
  };

  getProduct();

  const addToCart = () => {
    cartStore.addCartItem(product.value);
  };

  watch(route, () => {
    getProduct();
  });
</script>

<style lang="scss" scoped>
  .product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }

    &__price {
      font-size: 20px;
      margin-bottom: 20px;
      font-weight: 600;
    }

    &__description {
      margin-bottom: 20px;
    }

    &__rating {
      margin: 20px 0;
    }

    &__button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #000;
      color: #fff;
      border: none;

      &:hover {
        background-color: green;
      }
    }
  }
</style>
