<script setup>
import { RouterLink } from 'vue-router'
const { demande } = defineProps(['demande'])
</script>
<template>
  <RouterLink
    :to="`/demandes/${demande.id}`"
    class="w-[295px] min-w-[280px] border rounded-md px-3 py-2"
  >
    <p class="first-letter:capitalize">{{ demande.titre }}</p>
    <div class="">
      <p class="text-xs first-letter:capitalize">
        {{ demande.nomDemandeur ? demande.nomDemandeur : demande.nomUtilisateur }} -
        {{ demande.disponibilite }} - {{ demande.lieu }}
      </p>
    </div>
  </RouterLink>
</template>
