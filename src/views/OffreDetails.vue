<script setup>
import { useRoute } from 'vue-router'
import { useOffresStore } from '@/stores/offres.js'
import { ref, onMounted, watchEffect } from 'vue'

const route = useRoute()
const store = useOffresStore()
const offre = ref(null)

onMounted(() => {
  store.fetchOffres()
  store.fetchOffreUnique(route.params.id)
})

watchEffect(() => {
  const offres = store.tousLesOffres
  offre.value = store.offreUnique
  //   const offreId = route.params.id
})
</script>
<template>
  <div class="px-app bg-slate-100">
    <div>
      <div>
        <h3 class="text-amber-500 font-semibold underline">Offre d'emploi</h3>
      </div>
    </div>
    <div class="pt-6 flex gap-4" v-if="offre">
      <!-- gauche -->
      <div class="w-1/2">
        <h2 class="text-3xl font-semibold text-slate-700">{{ offre?.titre }}</h2>
        <div class="py-2">
          <p class="font-bold text-slate-500 text-md">Entreprise</p>
          <p class="text-sm">
            {{ offre.entreprise }}
          </p>
        </div>

        <div class="">
          <p class="font-bold text-slate-500 text-md">Type de contrat</p>
          <p class="text-sm">
            {{ offre.typeContrat }}
          </p>
        </div>

        <div class="py-2">
          <p class="font-bold text-slate-500 text-md">Lieu de travail</p>
          <p class="text-sm">
            {{ offre.lieu }}
          </p>
        </div>

        <!-- description -->
        <div>
          <p class="font-bold text-slate-500 text-md">Description</p>
          <p class="text-sm">
            {{ offre.description }} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
            quaerat a. Corporis deleniti provident suscipit fuga expedita itaque, quis mollitia
            animi adipisci officiis eaque rem quasi sapiente. Dolorem, beatae debitis.
          </p>
        </div>

        <div class="py-3">
          <p class="font-bold text-slate-500 text-md">Salaire</p>
          <p class="text-sm">
            {{ offre.salaire }}
          </p>
        </div>
      </div>
      <!-- !gauche -->

      <div class="flex flex-col gap-2 w-1/2">
        <div class="">
          <p class="font-bold text-slate-500 text-md">Compétences</p>
          <p class="text-sm">
            {{ offre.competences }}... Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Veniam, omnis obcaecati. Incidunt soluta sit repellendus aspernatur atque a sint animi.
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <p class="font-bold text-slate-500 text-md">Dossiers de candidature</p>
          <p class="text-sm">{{}} CV avec photo, lettre de motivation, dernier diplôme</p>
          <p class="text-sm">
            Canditdatez à l'adresse suivant : <span class="text-amber-500">{{ offre.email }}</span>
          </p>
          <p class="text-sm">
            jusqu'au: <span class="text-amber-500">{{ new Date() }},</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
