<template>
  <div class="product">
    <h3 class="product__title">
      <router-link
        :to="`/products/${product.product.id}`"
        class="product__link"
        @click="$emit('closePopup')"
        >{{ product.product.title }}</router-link
      >
    </h3>
    <div class="product__price">{{ product.product.price }} $</div>
    <cart-counter
      :product="product"
      class="product__count"
    ></cart-counter>
    <base-button
      @click="removeProduct(product)"
      class="product__remove"
      >Remove</base-button
    >
  </div>
</template>

<script setup>
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';
  import CartCounter from '@/components/cart/CartCounter.vue';

  const cartStore = useCartStore();

  defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const removeProduct = (product) => {
    cartStore.removeCartItem(product);
  };
</script>

<style scoped lang="scss">
  .product {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    @media (max-width: 500px) {
      grid-template-columns: 1fr 0.5fr 1fr 1fr;
    }

    &__title {
      margin: 0;
      font-size: 16px;
    }

    &__link {
      color: #000;
      text-decoration: none;

      &:hover {
        color: green;
      }
    }

    &__remove {
      background: #000;
      color: #fff;
      border: none;
      font-size: 16px;

      &:hover {
        background: green;
      }
    }
  }
</style>
