<template>
  <div>
    <ProductCard v-for="product in products" :key="product._id" :product="product" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([])

onMounted(async () => {
  const res = await fetch('/api/products')
  products.value = await res.json()
})
</script>
