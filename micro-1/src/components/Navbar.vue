<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item" href="/">
          {{ brand }}
        </span>
      </div>
    
      <div class="navbar-menu">
        <div class="navbar-start">
          <a 
            v-for="(link, idx) in links"
            :key="idx"
            class="navbar-item" 
            :href="link.url">
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    brand: {
      type: String,
      default: 'Universal Laravel Vue'
    },
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>