<script setup>
import Snippet from '@/components/Snippet.vue'
import axios from 'axios'
import { ref } from 'vue'

const loading = ref(false)
const error = ref(false)
const sucess = ref(false)

const form = ref({
  titre: '',
  nomUtilisateur: '',
  typeContrat: '',
  disponibilite: '',
  lieu: '',
  telephone: '',
  email: '',
  salaire: '',
  competences: '',
  expertise: '',
  resume: '',
})

const handleSubmit = async () => {
  loading.value = true
  try {
    const formData = {
      titre: form.value.titre,
      nomUtilisateur: form.value.nomUtilisateur,
      typeContrat: form.value.typeContrat,
      disponibilite: form.value.disponibilite,
      lieu: form.value.lieu,
      telephone: form.value.telephone,
      email: form.value.email,
      salaire: form.value.salaire,
      competences: form.value.competences,
      expertise: form.value.expertise,
      resume: form.value.resume,
      dateDePublication: new Date(),
    }

    const response = await axios.post('http://localhost:3005/demandes', formData)
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
    nomUtilisateur: '',
    typeContrat: '',
    disponibilite: '',
    lieu: '',
    telephone: '',
    email: '',
    salaire: '',
    competences: '',
    resume: '',
  }
}
</script>
<template>
  <div class="relative z-0 px-app flex flex-col items-center gap-3">
    <Snippet v-if="loading" />
    <Snippet v-if="error" message="Oups, une erreur s'est produite" />
    <Snippet v-if="sucess" message="succès, votre demande a été ajoutée!" />
    <h1 class="text-4xl text-amber-400">Ajouter une nouvelle demande d'emploi</h1>
    <div class="w-full border"></div>
    <form action="" class="w-full flex flex-col gap-3" @submit.prevent="handleSubmit">
      <div class="flex gap-3 w-full">
        <input
          v-model="form.titre"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="post souhaité (*)"
          required
        />
        <input
          v-model="form.nomUtilisateur"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Nom du demandeur (*)"
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
          v-model="form.disponibilite"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="disponibilite (*)"
          required
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
          placeholder="Adresse mail  (*)"
          required
        />
        <input
          v-model="form.salaire"
          type="text"
          class="w-1/2 p-2 border rounded-md outline-indigo-950"
          placeholder="Salaire"
        />
      </div>
      <div class="flex flex-col gap-3">
        <textarea
          v-model="form.expertise"
          id=""
          class="w-full p-2 border rounded-md outline-indigo-950 resize-none h-[150px]"
          placeholder="Expertise "
        ></textarea>
        <textarea
          v-model="form.competences"
          id=""
          class="w-full p-2 border rounded-md outline-indigo-950 resize-none h-[150px]"
          placeholder="Compétences (*)"
          required
        ></textarea>
        <textarea
          v-model="form.resume"
          id=""
          class="w-full p-2 border rounded-md outline-indigo-950 resize-none h-[150px]"
          placeholder="resumé"
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
