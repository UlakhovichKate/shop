<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div
        v-if="filteredProducts.length > 0"
        class="products"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <product-card :product="product"></product-card>
        </div>
      </div>
      <div v-else>Nothing to show</div>
      <products-filter
        :brands="brands"
        :min-price="minPrice"
        :max-price="maxPrice"
        @filter-brand="filterBrand"
        @filter-category="filterCategory"
        @filter-search="filterSearch"
        @reset-filters="resetFilters"
      ></products-filter>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/ProductCard.vue';
  import ProductsFilter from '@/components/ProductsFilter.vue';
  import {useFiltersStore} from '@/store/filters';

  const products = ref([]);
  const filteredProducts = ref([]);
  const filtersStore = useFiltersStore();
  const filterMinPrice = filtersStore.filterMinPrice;
  const filterMaxPrice = filtersStore.filterMaxPrice;

  const minPrice = ref(0);
  const maxPrice = ref(0);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
      brands.value = [...new Set(products.value.map((el) => el.brand))];
      filteredProducts.value = products.value;
      filtersStore.filterMinPrice = getMinimumPrice();
      filtersStore.filterMaxPrice = getMaximumPrice();
    } catch (e) {
      console.log(e);
    }
  };

  const brands = ref([]);

  getProducts();

  const filteredBrandProducts = ref('all');
  const filteredCategoryProducts = ref('all');
  const filteredSearchProducts = ref('');

  const filterBrand = (brand) => {
    filteredBrandProducts.value = brand;
    //filteredProducts.value = brand === 'all' ? products.value : products.value.filter((product) => product.brand === brand);
    filterProducts();
  };

  const filterProducts = () => {
    const category = filteredCategoryProducts.value;
    const brand = filteredBrandProducts.value;
    const search = filteredSearchProducts.value;
    console.log(category, brand, search);
    console.log(filterMinPrice, filterMaxPrice);

    // if (category !== 'all' && brand !== 'all' && search !== '') {
    //   filteredProducts.value = products.value.filter((product) => product.brand === brand && product.category === category && product.title.toLowerCase().includes(search.toLowerCase()));
    // } else if (category !== 'all' && brand !== 'all' && search === '') {
    //   filteredProducts.value = products.value.filter((product) => product.brand === brand && product.category === category);
    // } else if (category === 'all' && brand !== 'all' && search === '') {
    //   filteredProducts.value = products.value.filter((product) => product.brand === brand);
    // } else if (category !== 'all' && brand === 'all' && search === '') {
    //   filteredProducts.value = products.value.filter((product) => product.category === category);
    // } else if (category === 'all' && brand === 'all' && search !== '') {
    //   filteredProducts.value = products.value.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    // }

    if (category === 'all') {
      if (brand === 'all') {
        if (search === '') {
          console.log(1);
          filteredProducts.value = products.value;
        } else {
          console.log(2);
          filteredProducts.value = products.value.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
        }
      } else {
        if (search === '') {
          console.log(3);
          filteredProducts.value = products.value.filter((product) => product.brand === brand);
        } else {
          console.log(4);
          filteredProducts.value = products.value.filter((product) => product.brand === brand && product.title.toLowerCase().includes(search.toLowerCase()));
        }
      }
    } else {
      if (brand === 'all') {
        if (search === '') {
          console.log(5);
          filteredProducts.value = products.value.filter((product) => product.category === category);
        } else {
          console.log(6);
          filteredProducts.value = products.value.filter((product) => product.category === category && product.title.toLowerCase().includes(search.toLowerCase()));
        }
      } else {
        if (search === '') {
          console.log(7);
          filteredProducts.value = products.value.filter((product) => product.brand === brand && product.category === category);
        } else {
          console.log(8);
          filteredProducts.value = products.value.filter((product) => product.brand === brand && product.category === category && product.title.toLowerCase().includes(search.toLowerCase()));
        }
      }
    }
  };

  // watch(filterCategory, (category) => {
  //   filteredProducts.value = category === 'all' ? products.value : products.value.filter((product) => product.category === category);
  // });

  const filterCategory = (category) => {
    filteredCategoryProducts.value = category;
    //filteredProducts.value = category === 'all' ? products.value : products.value.filter((product) => product.category === category);
    filterProducts();
  };

  const filterSearch = (search) => {
    filteredSearchProducts.value = search;
    //filteredProducts.value = search === '' ? products.value : products.value.value.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    filterProducts();
  };

  const getMinimumPrice = () => {
    return products.value.reduce((min, p) => (p.price < min ? p.price : min), products.value[0].price);
  };
  const getMaximumPrice = () => {
    return products.value.reduce((max, p) => (p.price > max ? p.price : max), products.value[0].price);
  };

  const resetFilters = () => {
    filteredProducts.value = products.value;
  };
</script>

<style lang="scss" scoped>
  .page {
    &__content-wrapper {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 60px;

      @media (max-width: 991px) {
        grid-template-columns: 1fr;
      }
    }
  }
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px 30px;

    @media (max-width: 1260px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
      order: 2;
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
</style>
