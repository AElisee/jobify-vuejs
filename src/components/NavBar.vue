<script setup>
import { useAuthStore } from '@/stores/auth.js'
import {
  HomeIcon,
  TagIcon,
  BriefcaseIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/vue/24/solid'

const authStore = useAuthStore()

console.log('user', authStore.user)
</script>
<template>
  <nav
    class="px-app w-full sticky top-0 left-0 h-[100px] font-semibold bg-indigo-950 flex justify-between items-center z-50"
  >
    <div>
      <ul class="flex gap-4">
        <li>
          <RouterLink to="/" class="flex gap-1 text-slate-400">
            <HomeIcon class="h-5 w-5" /> Accueil
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/offres" class="flex gap-1 text-slate-400">
            <BriefcaseIcon class="h-5 w-5" /> Offres
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/demandes" class="flex gap-1 text-slate-400"
            ><TagIcon class="h-5 w-5" /> Demandes
          </RouterLink>
        </li>
      </ul>
    </div>
    <div>
      <ul class="flex gap-3" v-if="!authStore.isAuthenticated">
        <li>
          <RouterLink to="/login" class="px-4 py-2 text-slate-100 hover:text-amber-500">
            Se connecter
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/inscription"
            class="px-4 py-1 rounded-3xl border border-1 text-slate-100 bg-amber-500 hover:bg-slate-200 hover:text-amber-500"
          >
            S'inscrire
          </RouterLink>
        </li>
      </ul>
      <div
        @click="authStore.logout"
        v-if="authStore.isAuthenticated"
        class="flex text-amber-100 items-center cursor-pointer"
      >
        <ArrowLeftStartOnRectangleIcon class="h-6 w-6 text-orange-500 font-bold" />
        Déconnexion
      </div>
    </div>
  </nav>
</template>
