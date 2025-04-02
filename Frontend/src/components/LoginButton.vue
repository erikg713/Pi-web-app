<template>
  <button @click="login">Login with Pi</button>
</template>

<script setup>
import { authenticateWithPi } from '../pi'
const emit = defineEmits(['loginSuccess'])

const login = async () => {
  const user = await authenticateWithPi()
  if (user) emit('loginSuccess', user)
}
</script>
