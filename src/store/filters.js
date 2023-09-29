import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  const filterMinPrice = ref(0);
  const filterMaxPrice = ref(0);

  return {
    filterMinPrice,
    filterMaxPrice,
  };
});
