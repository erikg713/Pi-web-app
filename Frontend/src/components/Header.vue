<template>
  <header class="header" role="banner" aria-label="Marketplace Header">
    <h1>Palace of Goodz</h1>
    <p>The decentralized Pi marketplace</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  metaInfo: {
    title: 'Palace of Goodz',
    meta: [
      { name: 'description', content: 'The decentralized Pi marketplace' }
    ]
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 1rem;
  background-color: #6c5ce7;
  color: white;
}

@media (max-width: 600px) {
  .header {
    padding: 0.5rem;
  }
}
</style>
