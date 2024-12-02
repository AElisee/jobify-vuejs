<script setup>
import DemandeRecenteCard from '@/components/DemandeRecenteCard.vue'
import RechercheDemande from '@/components/Recherche.vue'
import { useDemandesStore } from '@/stores/demandes.js'
import { onMounted, ref, watchEffect, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useEtatsGeneraux } from '@/stores/etatsGeneraux.js'
import { useRouter } from 'vue-router'

const store = useDemandesStore()
const demandes = ref([])
const searchQuery = ref('')
const etatsStore = useEtatsGeneraux()
const router = useRouter()

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

// aller à la page d'ajout
const handleClikAdd = () => {
  etatsStore.clickAddBtn('/nouvelle-demande')
  router.push('/nouvelle-demande')
}
</script>
<template>
  <div class="px-app">
    <div class="flex justify-between items-center">
      <RechercheDemande @update:search="handleSearchUpdate" placeholder="Rechercher une demande" />
      <div class="">
        <a
          @click.prevent="handleClikAdd"
          href="/nouvelle-demande"
          class="border border-1 border-slate-200 rounded-md px-3 py-2 flex w-max items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          <span class="text-pink-700 font-semibold">Faire une demande</span></a
        >
      </div>
    </div>

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
