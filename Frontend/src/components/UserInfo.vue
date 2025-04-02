<template>
  <div class="user-info">
    <p v-if="user">Welcome, @{{ user.username }}</p>
    <p v-else>Welcome, Guest!</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
.user-info {
  font-size: 1.2em;
  color: #333;
  padding: 10px;
}

.user-info p {
  margin: 0;
}
</style>
