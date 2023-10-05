import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);
  const cartSum = ref(0);

  const addCartItem = (product) => {
    const existingItem = cartItems.value.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      cartItems.value.push({
        product,
        count: 1,
      });
    }

    getTotalSum();
  };

  const getTotalSum = () => {
    let cartSumArray = cartSum.value;

    cartSumArray = cartItems.value.map((product) => product.product.price * product.count);
    cartSum.value = cartSumArray.reduce((summary, currentValue) => summary + currentValue);
  };

  const removeCartItem = (itemToRemove) => {
    cartItems.value.splice(cartItems.value.indexOf(itemToRemove), 1);

    if (cartItems.value.length > 0) {
      getTotalSum();
    } else {
      cartSum.value = 0;
    }
  };

  return {
    cartItems,
    cartSum,
    addCartItem,
    removeCartItem,
    getTotalSum,
  };
});
