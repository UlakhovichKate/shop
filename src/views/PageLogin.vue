<template>
  <div class="page page_login">
    <div class="page__content-wrapper">
      <div class="login">
        <h1 class="login__title">Log in</h1>
        <div class="form">
          <div>
            <input
              v-model="name"
              type="text"
              name="name"
              class="form__input"
              placeholder="your name"
            />
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              name="password"
              class="form__input"
              placeholder="your password"
            />
          </div>
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

    &__input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: #fff;
    }

    &__button {
      background: #000;
      color: #fff;

      &:hover {
        background: green;
      }
    }
  }
</style>
