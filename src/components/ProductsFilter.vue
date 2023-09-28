<template>
  <div class="filter">
    <base-filter
      v-model:selected="filterCategory"
      :elements="categories"
      name="category"
    ></base-filter>
    <base-filter
      v-model:selected="filterBrand"
      :elements="brands"
      name="brand"
    ></base-filter>

    {{ filterCategory }} {{ filterBrand }}
  </div>
</template>

<script setup>
  import BaseFilter from '@/components/base/BaseFilter.vue';
  import {getAllCategories} from '@/api/apiProducts';
  import {ref, computed} from 'vue';

  const props = defineProps({
    brands: {
      type: Object,
      required: true,
    },
  });

  const categories = ref([]);

  const getCategories = async () => {
    try {
      categories.value = (await getAllCategories()).data;
    } catch (e) {
      console.log(e);
    }
  };

  getCategories();

  const brands = computed(() => props.brands);

  const filterCategory = ref(null);
  const filterBrand = ref(null);
</script>

<style lang="scss" scoped></style>
