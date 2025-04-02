<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.description" placeholder="Description" />
    <input v-model.number="form.price" placeholder="Price" />
    <button type="submit" :disabled="loading">Add Product</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({ name: '', description: '', price: 0 });
const loading = ref(false);
const error = ref('');

async function submit() {
  if (!form.name || !form.description || form.price <= 0) {
    error.value = 'Please fill out all fields correctly.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_API + '/api/admin/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    alert('Product added!');
    form.name = '';
    form.description = '';
    form.price = 0;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
}
</style>
