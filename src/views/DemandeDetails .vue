<script setup>
import { useRoute } from 'vue-router'
import { useDemandesStore } from '@/stores/demandes.js'
import { ref, onMounted, watchEffect } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/solid'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const route = useRoute()
const store = useDemandesStore()
const demande = ref(null)

onMounted(() => {
  store.fetchDemandes()
  store.fetchDemandeUnique(route.params.id)
})

watchEffect(() => {
  // const demandes = store.toutesLesDemandes()
  demande.value = store.demandeUnique
  //   const demandeId = route.params.id
})
</script>
<template>
  <div
    class="px-app bg-gradient-to-b from-slate-100/35 to-slate-100/55 p-2 first-letter:capitalize"
  >
    <div>
      <div class="flex gap-1 items-center">
        <BriefcaseIcon class="h-5 w-5 text-slate-700" />
        <h3 class="text-pink-700 font-semibold underline">Demande d'emploi</h3>
        <p>
          publié le :
          {{
            demande?.dateDePublication
              ? format(new Date(demande.dateDePublication), 'P', { locale: fr })
              : 'Date non précisée'
          }}
        </p>
      </div>
    </div>
    <div class="pt-5">
      <h2 class="text-3xl font-semibold text-slate-700">{{ demande?.titre }}</h2>
    </div>
    <div class="pt-6 flex gap-4" v-if="demande">
      <!-- gauche -->
      <div class="w-1/2 first-letter:capitalize">
        <div class="py-2">
          <p class="font-bold text-slate-500 text-md underline">Nom</p>
          <p class="text-sm">
            {{ demande?.nomDemandeur ? demande?.nomDemandeur : demande?.nomUtilisateur }}
          </p>
        </div>

        <div class="first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Type de contrat</p>
          <p class="text-sm">
            {{ demande?.typeContrat }}
          </p>
        </div>

        <div class="py-2 first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Lieu de travail</p>
          <p class="text-sm">
            {{ demande?.lieu }}
          </p>
        </div>

        <!-- resume -->
        <div class="first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Résumé</p>
          <p class="text-sm">
            {{ demande?.resume }}
          </p>
        </div>

        <div class="py-3 first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Salaire</p>
          <p class="text-sm" v-if="!demande.salaire || demande.salaire.trim() === ''">Non défini</p>
          <p class="text-sm" v-else>
            {{ demande?.salaire ? demande?.salaire : 'non défini' }}
          </p>
        </div>
      </div>
      <!-- !gauche -->

      <div class="flex flex-col gap-2 w-1/2 border-l-2 pl-3">
        <div class="first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Compétences</p>
          <p class="text-sm">{{ demande?.competences }}...</p>
        </div>
        <div class="first-letter:capitalize">
          <p class="font-bold text-slate-500 text-md underline">Expertise</p>
          <p class="text-sm">{{ demande?.expertise }}...</p>
        </div>
        <div class="">
          <p class="font-bold text-slate-500 text-md underline">Disponibilité</p>
          <p class="text-sm">{{ demande?.disponibilite }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <p class="font-bold text-slate-500 text-md underline">Contacts</p>
          <p class="text-sm">
            Tél. : <span class="text-pink-700">{{ demande.telephone }} </span>
          </p>
          <p class="text-sm">
            Adresse Email : <span class="text-pink-700">{{ demande.email }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
