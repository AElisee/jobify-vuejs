<script setup>
import { useUsersStore } from '@/stores/users.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const success = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()
const usersStore = useUsersStore()

const formData = ref({
  nom: '',
  prenoms: '',
  email: '',
  password: '',
  confirmPassward: '',
  contacts: '',
})

const handleSubmit = async () => {
  try {
    const newUser = {
      name: formData.value.nom,
      prenoms: formData.value.prenoms,
      password: formData.value.password,
      contacts: formData.value.contacts,
      email: formData.value.email,
    }

    if (formData.value.password !== formData.value.confirmPassward) {
      errorMessage.value = 'Les mots de passe ne correspondent pas !'
    } else {
      const response = await usersStore.register(newUser)
      if (response.success) {
        errorMessage.value = ''
        success.value = true
        successMessage.value = response.message
        setTimeout(() => {
          success.value = false
          router.push('/login')
        }, 3000)
      }
    }
  } catch (error) {
    errorMessage.value = response.message
  }
}
</script>
<template>
  <div class="flex flex-col gap-5">
    <p v-if="errorMessage" class="text-red-600 text-center text-md font-semibold">
      {{ errorMessage }}
    </p>
    <p v-if="success" class="text-green-600 text-center text-md font-semibold">
      {{ successMessage }}
    </p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-full">
      <input
        v-model="formData.nom"
        type="text"
        placeholder="Nom (*)"
        class="p-2 border rounded-md outline-indigo-950"
        required
      />
      <input
        v-model="formData.prenoms"
        type="text"
        placeholder="Prénoms (*)"
        class="p-2 border rounded-md outline-indigo-950"
        required
      />
      <input
        v-model="formData.email"
        type="email"
        placeholder="Adresse email (*)"
        class="p-2 border rounded-md outline-indigo-950"
        autocomplete=""
      />
      <input
        v-model="formData.contacts"
        type="text"
        placeholder="Numéro de téléphone"
        class="p-2 border rounded-md outline-indigo-950"
      />
      <input
        v-model="formData.password"
        type="password"
        placeholder="mot de passe (*)"
        class="p-2 border rounded-md outline-indigo-950"
      />
      <input
        v-model="formData.confirmPassward"
        type="password"
        placeholder="Confirmer le mot de passe (*)"
        class="p-2 border rounded-md outline-indigo-950"
        required
      />
      <input
        type="submit"
        class="p-2 bg-indigo-950 hover:bg-indigo-800 rounded-md cursor-pointer font-semibold text-white text-xl"
        value="S'inscrire"
      />
      <p class="text-center">
        Vous avez déjà un compte ?
        <RouterLink to="/login" class="font-semibold text-amber-500 underline"
          >Connectez-vous !</RouterLink
        >
      </p>
    </form>
  </div>
</template>
