<template>
  <div class="header">
    <div class="header__content-wrapper">
      <h1 class="header__title"><router-link to="/">Shop</router-link></h1>
      <div class="header__nav">
        <button
          @click="openCart"
          class="header__basket"
        >
          <span v-if="cartSum">{{ cartSum }} $</span>
          <img
            alt="cart"
            :src="shoppingCart"
          />
        </button>
        <div class="header__user">User</div>
        <base-button
          @click="logOut"
          button-class="header__logout"
          button-text="Log out"
        />
      </div>
    </div>
    <cart-popup
      v-if="isCartOpen"
      @close-cart-popup="closeCartPopup"
    />
  </div>
</template>

<script setup>
  import shoppingCart from '@/assets/shopping-cart-01.svg';
  import BaseButton from '@/components/base/BaseButton.vue';
  import CartPopup from '@/components/cart/CartPopup.vue';
  import {computed, ref} from 'vue';
  import {useCartStore} from '@/store/cart';
  import router from '@/router';

  const isCartOpen = ref(false);
  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCartPopup = () => {
    isCartOpen.value = false;
  };

  const cartStore = useCartStore();
  const cartSum = computed(() => cartStore.cartSum);

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
</script>

<style lang="scss" scoped>
  .header {
    padding: 20px;
    box-shadow: 0 2px 11px 0 rgb(222 222 222 / 50%);
    background-color: #fff;

    &__content-wrapper {
      max-width: 1440px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 260px;
      grid-gap: 15px;
      align-items: center;

      @media (max-width: 500px) {
        grid-template-columns: 1fr 225px;
      }
    }

    &__title {
      margin: 0;
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    &__user {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border: 1px solid #000;
      border-radius: 50%;

      @media (max-width: 500px) {
        width: 40px;
        height: 40px;
        font-size: 14px;
      }
    }

    &__basket {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    &__logout {
      border: 2px solid #000;
      background-color: #fff;
      color: #000;
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.5s;
      border-radius: 5px;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
</style>
