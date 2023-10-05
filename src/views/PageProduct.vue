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
            button-text="Add to cart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getProduct} from '@/api/apiProducts';
  import {useRoute} from 'vue-router';
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';
  import ProductRating from '@/components/product/ProductRating.vue';

  const route = useRoute();

  const product = ref([]);
  const cartStore = useCartStore();

  const getOneProduct = async () => {
    try {
      product.value = (await getProduct(route.params.productId)).data;
    } catch (e) {
      console.log(e);
    }
  };

  getOneProduct();

  const addToCart = () => {
    cartStore.addCartItem({
      id: product.value.id,
      name: product.value.title,
      price: product.value.price,
      count: 1,
    });
  };
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
