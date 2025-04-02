<template>
  <div class="user-info" aria-live="polite">
    <p v-if="user">Welcome, @{{ user.username }}</p>
    <p v-else>Welcome, Guest!</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props for the component
const props = defineProps({
  user: {
    type: Object,
    default: null,
    validator: (value) => {
      // Ensure the user object has a username property
      return value === null || (value && typeof value.username === 'string');
    }
  }
});
</script>

<style scoped>
.user-info {
  font-size: 1.2em;
  color: #333;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.user-info p {
  margin: 0;
}
</style>
