<template>
  <div class="product-card">
    <div>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
    </div>
    <BuyButton :product="product" />
  </div>
</template>

<script setup>
import BuyButton from './BuyButton.vue'
defineProps(['product'])
</script>

<style scoped>
.product-card {
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
</style>
