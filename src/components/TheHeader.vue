<template>
  <div class="header">
    <div class="header__content-wrapper">
      <h1 class="header__title"><a href="/">Shop</a></h1>
      <div class="header__nav">
        <button class="header__basket"><img alt="cart" :src="shoppingCart" /></button>
        <div class="header__user">User</div>
        <button class="header__logout">Log out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import shoppingCart from "@/assets/shopping-cart-01.svg";
</script>

<style lang="scss" scoped>
  .header {
    padding: 20px;
    box-shadow: 0px 2px 11px 0px rgb(222 222 222 / 50%);
    background-color: #fff;

    &__content-wrapper {
      max-width: 1440px;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 260px;
      grid-gap: 15px;
      align-items: center;
    }

    &__title {
      margin: 0;
    }

    &__nav {
      display: grid;
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
    }

    &__basket {
      border: none;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        opacity: .7;
      }
    }

    &__logout {
      border: 2px solid #000;
      background-color: #fff;
      color: #000;
      padding: 10px 20px;
      cursor: pointer;
      transition: all .5s;
      border-radius: 5px;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
</style>
