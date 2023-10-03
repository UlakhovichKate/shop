<template>
  <div class="card">
    <div class="card__header">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="card__image"
      />
      <div class="card__body">
        <h2 class="card__title">
          <router-link :to="`/products/${product.id}`">{{ product.title }}</router-link>
        </h2>
        <div class="card__brand">by {{ product.brand }}</div>
        <div class="card__price">{{ product.price }} $</div>
      </div>
    </div>
    <div class="card__footer">
      <base-button
        @click="addToCart"
        class="card__button"
        button-text="Add to cart"
      />
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import {useCartStore} from '@/store/cart';

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const product = computed(() => props.product);
  const cartStore = useCartStore();

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
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;

    &__image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }

    &__body {
      padding: 20px;
    }

    &__title {
      margin: 0;
      font-size: 18px;

      a {
        text-decoration: none;
        color: #000;

        &:hover {
          color: green;
        }
      }
    }

    &__brand {
      margin-bottom: 20px;
      font-size: 12px;
    }

    &__footer {
      padding: 20px;
    }

    &__button {
      padding: 10px 20px;
      border: 1px solid #000;
      background-color: #000;
      color: #fff;

      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>
