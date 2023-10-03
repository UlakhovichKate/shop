<template>
  <div class="counter">
    <div
      @click="countDecrease"
      class="counter__action counter__action_minus"
    >
      -
    </div>
    <div class="counter__number">{{ product.count }}</div>
    <div
      @click="countIncrease"
      class="counter__action counter__action_plus"
    >
      +
    </div>
  </div>
</template>

<script setup>
  import {useCartStore} from '@/store/cart';

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const cartStore = useCartStore();

  const countDecrease = () => {
    if (props.product.count > 1) {
      cartStore.cartItems.find((item) => item.id === props.product.id).count--;
      cartStore.getTotalSum();
    } else {
      cartStore.removeCartItem(props.product);
    }
  };

  const countIncrease = () => {
    cartStore.cartItems.find((item) => item.id === props.product.id).count++;
    cartStore.getTotalSum();
  };
</script>

<style scoped lang="scss">
  .counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 5px;

    &__action {
      cursor: pointer;

      &:hover {
        color: green;
      }
    }
  }
</style>
