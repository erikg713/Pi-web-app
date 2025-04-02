<template>
  <p v-if="user">Welcome, @{{ user.username }}</p>
</template>

<script setup>
defineProps(['user'])
</script>
