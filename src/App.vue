<template>
  <div id="app">
    <v-map></v-map>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'app',
  components: {
    'v-map':Map
  }
}
</script>

<style lang="less">
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
