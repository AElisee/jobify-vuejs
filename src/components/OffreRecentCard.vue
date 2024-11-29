<script setup>
import { RouterLink } from 'vue-router'
const { offre } = defineProps(['offre'])
</script>
<template>
  <RouterLink
    :to="`/offres/${offre.id}`"
    class="w-[295px] min-w-[280px] border rounded-md px-3 py-2"
  >
    <p>{{ offre.titre }}</p>
    <div class="">
      <p class="text-xs">{{ offre.entreprise }} - {{ offre.typeContrat }} - {{ offre.lieu }}</p>
    </div>
  </RouterLink>
</template>
