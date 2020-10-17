<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 margin: 0;
  padding: 0;
}
  body,html{
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  @import "~bootstrap";
</style>
