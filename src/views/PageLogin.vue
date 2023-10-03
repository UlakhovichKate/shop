<template>
  <div class="page page_login">
    <div class="page__content-wrapper">
      <form class="form">
        <input
          type="text"
          name="name"
          class="form__input"
          placeholder="your name"
        />
        <input
          type="password"
          name="password"
          class="form__input"
          placeholder="your password"
        />
        <base-button
          button-type="submit"
          button-text="Log in"
          class="form__button"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
  import BaseButton from '@/components/base/BaseButton.vue';
</script>

<style lang="scss" scoped></style>
