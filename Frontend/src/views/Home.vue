<template>
  <div>
    <h1>Marketplace</h1>
    <div v-for="product in products" :key="product._id">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <button @click="buy(product)">Buy</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const products = ref([]);

onMounted(async () => {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/api/products');
  products.value = await res.json();
});

function buy(product) {
  console.log('Buying', product);
}
</script>
