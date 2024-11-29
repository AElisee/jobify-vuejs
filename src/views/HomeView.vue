<script setup>
import Header from './../components/Header.vue'
import OffreRecent from './../components/OffreRecent.vue'
import DemandeRecente from './../components/DemandeRecente.vue'

import { useOffresStore } from '@/stores/offres.js'
import { onMounted } from 'vue'

const store = useOffresStore()

onMounted(() => {
  store.fetchOffres()
})
</script>
<template>
  <div class="px-app bg-indigo-950 text-slate-300">
    <Header />
    <OffreRecent />
    <DemandeRecente />
  </div>
</template>

<style></style>
