<script setup>
import OffreRecentCard from './OffreRecentCard.vue'
import { useOffresStore } from '@/stores/offres.js'
import { onMounted } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

const store = useOffresStore()

onMounted(() => {
  store.fetchOffres()
})
</script>
<template>
  <div class="relative px-app w-full flex justify-center mt-10 bg-transparent z-10">
    <div class="line"></div>
    <div
      class="recent flex justify-center items-center gap-2 min-w-max max-w-max max-h-max border-[1px] border-slate-50/60 rounded-lg px-3 py-2 font-semibold bg-indigo-950"
    >
      <span>Offres récentes</span>
    </div>
  </div>
  <div class="p-6">
    <ul class="flex gap-3 flex-wrap justify-between">
      <OffreRecentCard v-for="offre of store.dernieresOffres" :key="offre.id" :offre="offre" />
    </ul>
    <div class="pt-6">
      <a
        href="/nouvelle-offre"
        class="border border-1 border-slate-200 rounded-md px-3 py-2 flex w-max items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        <span class="text-slate-50 font-semibold">Publier une offre</span></a
      >
    </div>
  </div>
</template>
<style>
.line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%);
  z-index: -1;
  background-color: aliceblue;
}
</style>
