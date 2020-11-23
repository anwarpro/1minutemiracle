<template>
  <div class="bg-gray-100 min-h-screen flex overflow-hidden w-full">
    <miracle/>
  </div>
</template>

<script>
import Miracle from './components/Miracle.vue'

export default {
  name: 'App',
  components: {
    Miracle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}
</style>
