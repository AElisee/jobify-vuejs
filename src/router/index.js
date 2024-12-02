import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import NouvelleDemande from '@/views/NouvelleDemande.vue'
import NouvelleOffre from '@/views/NouvelleOffre.vue'
import Offres from '@/views/Offres.vue'
import SignUp from '@/views/SignUp.vue'
import OffreDetails from '@/views/OffreDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DemandeDetails from '@/views/DemandeDetails .vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomeView,
    },
    {
      path: '/offres',
      name: 'offres',
      component: Offres,
    },
    {
      path: '/offres/:id',
      name: 'offre-detail',
      component: OffreDetails,
    },
    {
      path: '/demandes/:id',
      name: 'demande-detail',
      component: DemandeDetails,
    },
    {
      path: '/demandes',
      name: 'demandes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./../views/Demandes.vue'),
    },
    {
      path: '/nouvelle-offre',
      name: 'nouvelle-offre',
      component: NouvelleOffre,
      meta: { requiredAuth: true },
    },
    {
      path: '/nouvelle-demande',
      name: 'nouvelle-demande',
      component: NouvelleDemande,
      meta: { requiredAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: SignUp,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiredAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
