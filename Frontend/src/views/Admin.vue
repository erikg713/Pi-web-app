<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.description" placeholder="Description" />
    <input v-model.number="form.price" placeholder="Price" />
    <button type="submit">Add Product</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({ name: '', description: '', price: 0 });

async function submit() {
  await fetch(import.meta.env.VITE_BACKEND_API + '/api/admin/add-product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  alert('Product added!');
}
</script>
