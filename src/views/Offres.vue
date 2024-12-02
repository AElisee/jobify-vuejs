<script setup>
import OffreRecentCard from '@/components/OffreRecentCard.vue'
import RechercheEmploi from '@/components/Recherche.vue'
import { useOffresStore } from '@/stores/offres.js'
import { onMounted, ref, watchEffect, computed } from 'vue'

const store = useOffresStore()
const offres = ref([])
const searchQuery = ref('') // Texte de recherche

onMounted(() => {
  store.fetchOffres()
})

watchEffect(() => {
  offres.value = store.tousLesOffres
})

// Offres filtrées en fonction du texte de recherche
const filteredOffres = computed(() => {
  if (!searchQuery.value.trim()) {
    return offres.value
  }
  const query = searchQuery.value.toLowerCase()
  return offres.value.filter((offre) => offre.titre.toLowerCase().includes(query))
})

// Mettre à jour la recherche quand l'événement est reçu
const handleSearchUpdate = (query) => {
  searchQuery.value = query
}
</script>
<template>
  <div class="px-app bg-gradient-to-b from-slate-100/35 to-slate-100/55">
    <RechercheEmploi @update:search="handleSearchUpdate" placeholder="Rechercher une offre" />
    <div v-if="filteredOffres.length > 0" class="flex gap-2 justify-center pt-10 flex-wrap">
      <OffreRecentCard
        v-for="offre of filteredOffres"
        :key="offre.id"
        :offre="offre"
      ></OffreRecentCard>
    </div>
    <div v-else class="pt-10">
      <p>
        Aucune offre disponible sous le titre
        <span class="text-amber-400 underline">{{ searchQuery }}</span>
      </p>
    </div>
  </div>
</template>
