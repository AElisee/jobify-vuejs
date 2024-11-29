import { defineStore } from 'pinia'
import axios from 'axios'
const apiUrl = 'http://localhost:3005/offres'

export const useOffresStore = defineStore('offresStore', {
  state: () => ({
    offres: [],
    offreUnique: null,
  }),

  getters: {
    tousLesOffres: (state) => state.offres,
    dernieresOffres: (state) => state.offres.slice(0, 24),
  },

  actions: {
    async fetchOffres() {
      try {
        const response = await axios.get(apiUrl)
        this.offres = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },

    async fetchOffreUnique(id) {
      try {
        const response = await axios.get(`${apiUrl}/${id}`)
        this.offreUnique = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
      }
    },
  },
})
