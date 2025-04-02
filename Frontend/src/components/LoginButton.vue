<template>
  <button 
    @click="login" 
    :disabled="loading" 
    aria-label="Login with Pi" 
    :class="{ 'focus-visible': focusVisible }" 
    @focusin="handleFocusVisible(true)" 
    @focusout="handleFocusVisible(false)">
    <span v-if="loading">Loading...</span>
    <span v-else>Login with Pi</span>
  </button>
  <p v-show="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { authenticateWithPi } from '../pi'
const emit = defineEmits(['loginSuccess'])

const loading = ref(false)
const errorMessage = ref('')
const focusVisible = ref(false)

const login = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const user = await authenticateWithPi()
    if (user) {
      emit('loginSuccess', user)
    } else {
      errorMessage.value = 'Authentication failed'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during authentication'
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleFocusVisible = (state) => {
  focusVisible.value = state
}
</script>

<style scoped>
:root {
  --button-color: #4CAF50;
  --button-hover-color: #45a049;
  --button-disabled-color: #9E9E9E;
  --focus-outline-color: #ffffff;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: var(--button-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: var(--button-disabled-color);
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: var(--button-hover-color);
}

button.focus-visible {
  outline: 2px solid var(--focus-outline-color);
  outline-offset: 2px;
}
</style>
