import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'http://localhost:3005/demandes'

export const useDemandesStore = defineStore('demandesStore', {
  state: () => ({
    demandes: [],
    demandeUnique: null,
  }),

  getters: {
    toutesLesDemandes: (state) => state.demandes,
    dernieresDemandes: (state) => state.demandes.slice(0, 24),
  },

  actions: {
    async fetchDemandes() {
      try {
        const response = await axios.get(apiUrl)
        this.demandes = response.data
        console.log(this.demandes)
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },

    async fetchDemandeUnique(id) {
      try {
        const response = await axios.get(`${apiUrl}/${id}`)
        this.demandeUnique = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },
  },
})
