<template>
  <div class="rating">
    <div class="rating__title">Rating is: {{ rating }}</div>
    <div class="rating__stars">
      <div
        v-for="(star, index) in floorStars(rating)"
        :key="index"
        class="rating__star"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="orange"
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="black"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <svg
        v-if="tailStars()"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <linearGradient id="Gradient1">
          <stop
            class="stop1"
            :offset="`${tailStars()}%`"
          />
          <stop
            class="stop2"
            :offset="`${tailStars()}%`"
          />
          <stop
            class="stop3"
            offset="100%"
          />
        </linearGradient>
        <path
          id="rect1"
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="black"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    rating: {
      type: Number,
      default: 5,
    },
  });

  const rating = computed(() => props.rating);

  const floorStars = (number) => {
    return Math.floor(number);
  };

  const tailStars = () => {
    return String(rating.value).split('.')[1];
  };
</script>

<style scoped lang="scss">
  .rating {
    &__stars {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 5px;
      max-width: 150px;
    }

    #rect1 {
      fill: url(#Gradient1);
    }
    .stop1 {
      stop-color: orange;
    }
    .stop2 {
      stop-color: transparent;
    }
    .stop3 {
      stop-color: transparent;
    }
  }
</style>
