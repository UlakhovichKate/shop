<template>
  <div class="cart">
    <div class="cart__content-wrapper">
      <base-button
        @click="closeCartPopup"
        class="cart__close"
        button-text="x"
      />
      <h2 class="cart__title">Cart</h2>
      <div
        v-if="cartItems.length > 0"
        class="cart__products"
      >
        <cart-item
          v-for="product in cartItems"
          :key="product.id"
          :product="product"
        />
        <div class="cart__summary">Total: {{ cartSum }}</div>
      </div>
      <div v-else>Cart is empty</div>
    </div>
  </div>
</template>

<script setup>
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';
  import CartItem from '@/components/cart/CartItem.vue';
  import {computed} from 'vue';

  const emit = defineEmits(['closeCartPopup']);

  const cartStore = useCartStore();
  const cartItems = cartStore.cartItems;
  const cartSum = computed(() => cartStore.cartSum);

  const closeCartPopup = () => {
    emit('closeCartPopup');
  };
</script>

<style scoped lang="scss">
  .cart {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);

    &__content-wrapper {
      position: relative;
      max-width: 500px;
      width: 100%;
      max-height: 80vh;
      overflow-y: scroll;
      margin: 10vh auto 0;
      padding: 20px;
      border-radius: 10px;
      background: #fff;

      @media (max-width: 500px) {
        max-width: 90vw;
      }
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #000;
      border: none;
      font-size: 20px;

      &:hover {
        background: #ccc;
      }
    }

    &__summary {
      margin-top: 20px;
    }
  }
</style>
