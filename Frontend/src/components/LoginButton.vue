<template>
  <button @click="login" :disabled="loading">
    <span v-if="loading">Loading...</span>
    <span v-else>Login with Pi</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { authenticateWithPi } from '../pi'
const emit = defineEmits(['loginSuccess'])

const loading = ref(false)

const login = async () => {
  loading.value = true
  try {
    const user = await authenticateWithPi()
    if (user) {
      emit('loginSuccess', user)
    } else {
      console.error('Authentication failed')
    }
  } catch (error) {
    console.error('An error occurred during authentication', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
button {
  /* Add your custom styling here */
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #9E9E9E;
  cursor: not-allowed;
}
</style>
