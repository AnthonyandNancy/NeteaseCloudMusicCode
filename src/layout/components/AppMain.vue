<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Appmain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped></style>
