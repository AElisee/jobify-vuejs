import { defineStore } from 'pinia'

export const useEtatsGeneraux = defineStore('etatsGeneraux', {
  state: () => ({
    redirectLink: null,
  }),

  getters: {
    getRedirectLink: (state) => state.redirectLink,
  },

  actions: {
    clickAddBtn(link) {
      console.log('click !')

      this.redirectLink = link
    },
  },
})
