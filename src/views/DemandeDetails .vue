<script setup>
import { useRoute } from 'vue-router'
import { useDemandesStore } from '@/stores/demandes.js'
import { ref, onMounted, watchEffect } from 'vue'

const route = useRoute()
const store = useDemandesStore()
const demande = ref(null)

onMounted(() => {
  // store.fetchDemandes()
  store.fetchDemandeUnique(route.params.id)
})

watchEffect(() => {
  // const demande = store.tousLesOffres
  demande.value = store.demandeUnique
  //   const offreId = route.params.id
})
</script>
<template>
  <div class="px-app bg-slate-100">
    <div>
      <div>
        <h3 class="text-pink-600 font-semibold underline">Demande d'emploi</h3>
      </div>
    </div>
    <div class="pt-6">
      <h2 class="text-3xl font-semibold text-slate-700">{{ demande?.titre }}</h2>
    </div>
  </div>
</template>
