<template>
  <div class="page page_login">
    <div class="page__content-wrapper">
      <div class="login">
        <h1 class="login__title">Log in</h1>
        <div class="form">
          <base-input
            v-model:value="name"
            type="text"
            name="name"
            class="form__input"
            placeholder="your name"
          />
          <base-input
            v-model:value="password"
            type="password"
            name="password"
            class="form__input"
            placeholder="your password"
          />
          <base-button
            @click="login"
            class="form__button"
            >Log in</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseButton from '@/components/base/BaseButton.vue';
  import {ref} from 'vue';
  import router from '@/router';
  import BaseInput from '@/components/base/BaseInput.vue';

  const name = ref('');
  const password = ref('');

  const login = () => {
    if (name.value && password.value) {
      localStorage.setItem('token', '1111');
      name.value = '';
      password.value = '';
      router.push('/');
    }
  };
</script>

<style lang="scss" scoped>
  .page {
    &__content-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  }

  .login {
    margin: 0 0 100px;

    &__title {
      margin-top: 0;
      text-align: center;
    }
  }

  .form {
    display: grid;
    grid-gap: 20px;

    &__button {
      background: #000;
      color: #fff;

      &:hover {
        background: green;
      }
    }
  }
</style>
