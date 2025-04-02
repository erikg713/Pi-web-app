<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="products.length">
      <ProductCard v-for="product in products" :key="product._id" :product="product" />
    </div>
    <div v-else>No products available.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/products')
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
