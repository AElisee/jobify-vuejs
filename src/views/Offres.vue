<script setup>
import OffreRecentCard from '@/components/OffreRecentCard.vue'
import RechercheEmploi from '@/components/Recherche.vue'
import { useEtatsGeneraux } from '@/stores/etatsGeneraux.js'
import { useOffresStore } from '@/stores/offres.js'
import { onMounted, ref, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/24/solid'

const store = useOffresStore()
const offres = ref([])
const searchQuery = ref('') // Texte de recherche
const etatsStore = useEtatsGeneraux()
const router = useRouter()

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

const handleClikAdd = () => {
  etatsStore.clickAddBtn('/nouvelle-offre')
  router.push('/nouvelle-offre')
}
</script>
<template>
  <div class="px-app bg-gradient-to-b from-slate-100/35 to-slate-100/55">
    <div class="flex justify-between items-center">
      <RechercheEmploi @update:search="handleSearchUpdate" placeholder="Rechercher une offre" />
      <div class=" ">
        <a
          @click.prevent="handleClikAdd"
          href="/nouvelle-offre"
          class="border border-1 border-slate-200 rounded-md px-3 py-2 flex w-max items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          <span class="text-amber-500 font-semibold">Publier une offre</span></a
        >
      </div>
    </div>
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
