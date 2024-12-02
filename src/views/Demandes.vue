<script setup>
import DemandeRecenteCard from '@/components/DemandeRecenteCard.vue'
import RechercheDemande from '@/components/Recherche.vue'
import { useDemandesStore } from '@/stores/demandes.js'
import { onMounted, ref, watchEffect, computed } from 'vue'

const store = useDemandesStore()
const demandes = ref([])
const searchQuery = ref('')

onMounted(() => {
  store.fetchDemandes()
})

watchEffect(() => {
  demandes.value = store.toutesLesDemandes
})

// Offres filtrées en fonction du texte de recherche
const filtreDemandes = computed(() => {
  if (!searchQuery.value.trim()) {
    return demandes.value
  }
  const query = searchQuery.value.toLowerCase()
  return demandes.value.filter((demande) => demande.titre.toLowerCase().includes(query))
})

// Mettre à jour la recherche quand l'événement est reçu
const handleSearchUpdate = (query) => {
  searchQuery.value = query
}
</script>
<template>
  <div class="px-app">
    <RechercheDemande @update:search="handleSearchUpdate" placeholder="Rechercher une demande" />
    <div v-if="filtreDemandes.length > 0" class="flex gap-2 justify-center pt-10 flex-wrap">
      <DemandeRecenteCard
        v-for="demande of filtreDemandes"
        :key="demande.id"
        :demande="demande"
      ></DemandeRecenteCard>
    </div>
    <div v-else class="pt-10">
      <p>
        Aucune demande disponible sous le titre
        <span class="text-pink-700 underline">{{ searchQuery }}</span>
      </p>
    </div>
  </div>
</template>
