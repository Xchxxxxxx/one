<template>
  <router-view />
</template>
<script setup lang="ts">
  // App.vue setup
import Lenis from '@studio-freight/lenis'
import { onMounted } from 'vue'

onMounted(() => {
  const lenis = new Lenis()
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})
</script>
<style scoped></style>
