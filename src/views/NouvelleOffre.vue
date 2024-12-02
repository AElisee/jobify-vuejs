<script setup>
import Snippet from '@/components/Snippet.vue'
import axios from 'axios'
import { ref } from 'vue'

const loading = ref(false)
const error = ref(false)
const sucess = ref(false)

const form = ref({
  titre: '',
  entreprise: '',
  typeContrat: '',
  salaire: '',
  lieu: '',
  telephone: '',
  email: '',
  dateLimite: '',
  competences: '',
  description: '',
})

const handleSubmit = async () => {
  loading.value = true
  try {
    const formData = {
      titre: form.value.titre,
      entreprise: form.value.entreprise,
      typeContrat: form.value.typeContrat,
      salaire: form.value.salaire,
      lieu: form.value.lieu,
      telephone: form.value.telephone,
      email: form.value.email,
      dateLimite: form.value.dateLimite,
      competences: form.value.competences,
      description: form.value.description,
      dateDePublication: new Date(),
    }

    const response = await axios.post('http://localhost:3005/offres', formData)
    if (response.status == 201) {
      loading.value = false
      sucess.value = true
      setTimeout(() => {
        sucess.value = false
      }, 5000)
      resetForm()
    }
  } catch (err) {
    console.error('Erreur lors de la soumission:', err)
    loading.value = false
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 5000)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    titre: '',
    entreprise: '',
    typeContrat: '',
    salaire: '',
    lieu: '',
    telephone: '',
    email: '',
    dateLimite: '',
    competences: '',
    description: '',
  }
}
</script>
<template>
  <div class="relative z-0 px-app flex flex-col items-center gap-3">
    <Snippet v-if="loading" />
    <Snippet v-if="error" message="Oups, une erreur s'est produite" />
    <Snippet v-if="sucess" message="succès, l'offre à été ajoutée !" />
    <h1 class="text-4xl text-amber-400">Ajouter une nouvelle Offre</h1>
    <div class="w-full border"></div>
    <form action="" class="w-full flex flex-col gap-3" @submit.prevent="handleSubmit">
      <div class="flex gap-3 w-full">
        <input
          v-model="form.titre"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Titre de l'offre (*)"
          required
        />
        <input
          v-model="form.entreprise"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Nom de l'entreprise (*)"
          required
        />
      </div>
      <div class="flex gap-3 w-full">
        <input
          v-model="form.typeContrat"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Type de contrat (*)"
          required
        />
        <input
          v-model="form.salaire"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Salaire par mois"
        />
      </div>
      <div class="flex gap-3 w-full">
        <input
          v-model="form.lieu"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Lieu (*)"
          required
        />
        <input
          v-model="form.telephone"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="N° de téléphone"
        />
      </div>
      <div class="flex gap-3 w-full">
        <input
          v-model="form.email"
          type="email"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Adresse de dépot de canditature (*)"
          required
        />
        <input
          v-model="form.dateLimite"
          type="date"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Date limite de depot de candidature"
          required
        />
      </div>
      <div class="flex flex-col gap-3">
        <textarea
          v-model="form.competences"
          id=""
          class="w-full p-2 border rounded-md outline-indigo-950 resize-none h-[200px]"
          placeholder="Compétences (*)"
          required
        ></textarea>
        <textarea
          v-model="form.description"
          id=""
          class="w-full p-2 border rounded-md outline-indigo-950 resize-none h-[200px]"
          placeholder="Description de l'offre"
        ></textarea>
        <div class="w-full flex justify-center">
          <input
            type="submit"
            class="p-3 bg-indigo-950 hover:bg-indigo-800 w-[300px] rounded-md cursor-pointer font-semibold text-white text-xl"
            value="Soumettre"
          />
        </div>
      </div>
    </form>
  </div>
</template>
