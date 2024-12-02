<script setup>
import { useRoute } from 'vue-router'
import { useOffresStore } from '@/stores/offres.js'
import { ref, onMounted, watchEffect } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/solid'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const route = useRoute()
const store = useOffresStore()
const offre = ref(null)

onMounted(() => {
  store.fetchOffres()
  store.fetchOffreUnique(route.params.id)
})

watchEffect(() => {
  // const offres = store.tousLesOffres
  offre.value = store.offreUnique
  //   const offreId = route.params.id
})
</script>
<template>
  <div class="px-app bg-slate-100/55 p-2">
    <div>
      <div class="flex gap-1 items-center">
        <BriefcaseIcon class="h-5 w-5 text-slate-700" />
        <h3 class="text-amber-500 font-semibold underline">Offre d'emploi</h3>
        <p>
          publié le :
          {{
            offre?.dateDePublication
              ? format(new Date(offre.dateDePublication), 'P', { locale: fr })
              : 'Date non précisée'
          }}
        </p>
      </div>
    </div>
    <div class="pt-5">
      <h2 class="text-3xl font-semibold text-slate-700">{{ offre?.titre }}</h2>
    </div>
    <div class="pt-6 flex gap-4" v-if="offre">
      <!-- gauche -->
      <div class="w-1/2">
        <div class="py-2">
          <p class="font-bold text-slate-500 text-md underline">Entreprise</p>
          <p class="text-sm">
            {{ offre?.entreprise }}
          </p>
        </div>

        <div class="">
          <p class="font-bold text-slate-500 text-md underline">Type de contrat</p>
          <p class="text-sm">
            {{ offre?.typeContrat }}
          </p>
        </div>

        <div class="py-2">
          <p class="font-bold text-slate-500 text-md underline">Lieu de travail</p>
          <p class="text-sm">
            {{ offre?.lieu }}
          </p>
        </div>

        <!-- description -->
        <div>
          <p class="font-bold text-slate-500 text-md underline">Description</p>
          <p class="text-sm">
            {{ offre?.description }} Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Totam, quaerat a. Corporis deleniti provident suscipit fuga expedita itaque, quis
            mollitia animi adipisci officiis eaque rem quasi sapiente. Dolorem, beatae debitis.
          </p>
        </div>

        <div class="py-3">
          <p class="font-bold text-slate-500 text-md underline">Salaire</p>
          <p class="text-sm" v-if="!offre.salaire || offre.salaire.trim() === ''">Non défini</p>
          <p class="text-sm" v-else>
            {{ offre?.salaire ? offre?.salaire : 'non défini' }}
          </p>
        </div>
      </div>
      <!-- !gauche -->

      <div class="flex flex-col gap-2 w-1/2 border-l-2 pl-3">
        <div class="">
          <p class="font-bold text-slate-500 text-md underline">Compétences</p>
          <p class="text-sm">
            {{ offre?.competences }}... Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Veniam, omnis obcaecati. Incidunt soluta sit repellendus aspernatur atque a sint animi.
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <p class="font-bold text-slate-500 text-md underline">Dossiers de candidature</p>
          <p class="text-sm">{{}} CV avec photo, lettre de motivation, dernier diplôme</p>
          <p class="text-sm">
            Canditdatez à l'adresse suivant : <span class="text-amber-500">{{ offre?.email }}</span>
          </p>
          <p class="text-sm">
            Date limite de candidature:
            <span class="text-amber-500">
              {{
                offre?.dateLimite
                  ? format(new Date(offre.dateLimite), 'PPP', { locale: fr })
                  : 'Date non précisée'
              }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
