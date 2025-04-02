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
      { name: 'description', content: 'The decentralized Pi marketplace' },
      // Add more meta tags here
      { name: 'keywords', content: 'web3, decentralized, marketplace, Pi' },
      { name: 'author', content: 'erikg713' },
      { property: 'og:title', content: 'Palace of Goodz' },
      { property: 'og:description', content: 'The decentralized Pi marketplace' },
      { property: 'og:type', content: 'website' }
    ]
  }
}
</script>

<style scoped>
:root {
  --primary-color: #6c5ce7;
  --secondary-color: white;
}

.header {
  text-align: center;
  padding: 1rem;
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

@media (max-width: 600px) {
  .header {
    padding: 0.5rem;
  }
}
</style>
