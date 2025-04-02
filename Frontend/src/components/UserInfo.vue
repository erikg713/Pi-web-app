<template>
  <div v-if="loading" class="user-info" aria-live="polite">
    <p>Loading user information...</p>
  </div>
  <div v-else-if="error" class="user-info" aria-live="polite">
    <p>Error loading user information. Please try again later.</p>
  </div>
  <div v-else-if="user" class="user-info" aria-live="polite">
    <p>Welcome, @{{ user.username }}</p>
  </div>
  <div v-else class="user-info" aria-live="polite">
    <p>Welcome, Guest!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';

// Define the props for the component
const props = defineProps<{
  user: {
    username: string;
  } | null;
}>();

const loading = ref(true);
const error = ref(false);

onMounted(() => {
  // Simulate fetching user data
  setTimeout(() => {
    loading.value = false;
    if (!props.user) {
      error.value = true;
    }
  }, 1000);
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
