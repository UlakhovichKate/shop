<template>
  <div class="product">
    <h3 class="product__title">
      <a
        :href="`/products/` + product.id"
        class="product__link"
        >{{ product.name }}</a
      >
    </h3>
    <div class="product__price">{{ product.price }} $</div>
    <div class="product__count">{{ product.count }}</div>
    <base-button
      @click="removeProduct(product)"
      button-class="product__remove"
      button-text="Remove from cart"
    />
  </div>
</template>

<script setup>
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';

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
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: green;
      }
    }
  }
</style>
