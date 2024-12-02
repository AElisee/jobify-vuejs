import { defineStore } from 'pinia'
import axios from 'axios'
// import { useRouter } from "vue-router";

const BaseUrl = 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  getters: {
    connectedUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(`${BaseUrl}/auth/login`, credentials)

        // Récupérer l'utilisateur et le token depuis la réponse
        this.user = response.data.result.user
        this.token = response.data.result.token

        // Stocker le token dans localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        this.isAuthenticated = true
      } catch (error) {
        console.log('Erreur lors de la connexion:', error)
        this.isAuthenticated = false
        throw error
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.reload()
    },
  },
})
