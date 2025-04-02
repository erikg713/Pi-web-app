<template>
  <div class="product-card" role="region" aria-labelledby="product-name">
    <div>
      <h3 id="product-name">{{ product.name }}</h3>
      <p>{{ product.description }}</p>
    </div>
    <BuyButton :product="product" />
  </div>
</template>

<script setup>
import { defineProps, defineAsyncComponent } from 'vue'
const BuyButton = defineAsyncComponent(() => import('./BuyButton.vue'))

defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      description: '',
      // Add other default properties if needed
    }),
  },
})
</script>

<style scoped>
.product-card {
  background: var(--card-background, white);
  padding: var(--card-padding, 1rem);
  margin-bottom: var(--card-margin-bottom, 1rem);
  border-radius: var(--card-border-radius, 10px);
  box-shadow: var(--card-box-shadow, 0 0 5px rgba(0,0,0,0.1));
}
</style>
