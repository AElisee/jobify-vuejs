import axios from 'axios'
import { defineStore } from 'pinia'
const BaseUrl = 'http://localhost:3000/api'

export const useUsersStore = defineStore('UsersStore', {
  state: () => ({
    users: [],
  }),

  actions: {
    async register(userData) {
      try {
        const response = await axios.post(`${BaseUrl}/auth/register`, userData)
        const token = response.data.result
        await axios.get(`${BaseUrl}/auth/confirmation/${token}`)
        // console.log()
        return {
          success: true,
          message: 'Inscription réussie, vous serrez rediriger vers la page de connexion !',
        }
      } catch (error) {
        console.error('erreur lors de la validation', error)
        return { success: false, message: error.message }
      }
    },
  },
})
