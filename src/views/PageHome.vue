<template>
  <div class="page">
    <div class="page__content-wrapper">
      <div class="page__inner">
        <products-sort
          v-if="filteredProducts.length > 0"
          @sort-by="sortBy"
        />
        <div
          v-if="filteredProducts.length > 0"
          class="products"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <product-card :product="product" />
          </div>
        </div>
        <div v-else>Nothing to show</div>
      </div>
      <products-filter
        :brands="brands"
        :categories="categories"
        v-model:min-price="minPrice"
        v-model:max-price="maxPrice"
        @filter-brand="filterBrand"
        @filter-category="filterCategory"
        @filter-search="filterSearch"
        @reset-filters="resetFilters"
      />
    </div>
  </div>
</template>

<script setup>
  import {ref, watch} from 'vue';
  import {getAllProducts} from '@/api/apiProducts';
  import ProductCard from '@/components/products/ProductsCard.vue';
  import ProductsFilter from '@/components/products/ProductsFilter.vue';
  import ProductsSort from '@/components/products/ProductsSort.vue';
  import sortByPrice from '@/helpers/sortByPrice';
  import sortByTitle from '@/helpers/sortByTitle';

  const products = ref([]);
  const filteredProducts = ref([]);

  const minPrice = ref(0);
  const maxPrice = ref(0);

  const getProducts = async () => {
    try {
      products.value = (await getAllProducts()).data.products;
      sortByTitle(products.value);
      brands.value = [...new Set(products.value.map((el) => el.brand))];
      categories.value = [...new Set(products.value.map((el) => el.category))];
      filteredProducts.value = products.value;
      minPrice.value = getMinimumPrice();
      maxPrice.value = getMaximumPrice();
    } catch (e) {
      console.log(e);
    }
  };

  const brands = ref([]);
  const categories = ref([]);

  getProducts();

  const filteredBrandProducts = ref('all');
  const filteredCategoryProducts = ref('all');
  const filteredSearchProducts = ref('');

  const filterProducts = () => {
    const category = filteredCategoryProducts.value;
    const brand = filteredBrandProducts.value;
    const search = filteredSearchProducts.value;
    const min = minPrice.value;
    const max = maxPrice.value;
    const regexp = `A-Za-z0-9_-/`;

    filteredProducts.value = products.value.filter(
      (product) =>
        (brand === 'all' ? product.brand.matchAll(regexp) : product.brand === brand) &&
        (category === 'all' ? product.category.matchAll(regexp) : product.category === category) &&
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        product.price >= min &&
        product.price <= max,
    );

    sortBy(activeSortType.value);
  };

  const filterCategory = (category) => {
    filteredCategoryProducts.value = category;
    filterProducts();
  };

  const filterBrand = (brand) => {
    filteredBrandProducts.value = brand;
    filterProducts();
  };

  const filterSearch = (search) => {
    filteredSearchProducts.value = search;
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
    filteredBrandProducts.value = 'all';
    filteredCategoryProducts.value = 'all';
    filteredSearchProducts.value = '';
    minPrice.value = getMinimumPrice();
    maxPrice.value = getMaximumPrice();
  };

  watch(minPrice, (price) => {
    minPrice.value = price;
    filterProducts();
  });

  watch(maxPrice, (price) => {
    maxPrice.value = price;
    filterProducts();
  });

  const activeSortType = ref('title');

  const sortBy = (sortType) => {
    activeSortType.value = sortType;

    if (sortType === 'title') {
      sortByTitle(filteredProducts.value);
    } else if (sortType === 'minPrice') {
      sortByPrice(filteredProducts.value, 'min');
    } else {
      sortByPrice(filteredProducts.value, 'max');
    }
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

    &__inner {
      @media (max-width: 991px) {
        order: 2;
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
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
</style>
