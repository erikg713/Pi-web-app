<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="products.length">
      <ProductCard v-for="product in products" :key="product._id" :product="product" />
    </div>
    <div v-else class="no-products">No products available.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Lazy load ProductCard component
const ProductCard = defineAsyncComponent(() => import('./ProductCard.vue'))

onMounted(async () => {
  try {
    const res = await fetch('/api/products')
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`)
    }
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading {
  font-size: 1.2em;
  color: #007bff;
  text-align: center;
  margin-top: 20px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.no-products {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
}
</style>
