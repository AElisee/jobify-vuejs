<script setup>
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>
<template>
  <Navbar />
  <RouterView class="pt-5 min-h-[75vh]"></RouterView>
  <Footer />
</template>
