<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useEtatsGeneraux } from '@/stores/etatsGeneraux.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const href = ref('')
const authStore = useAuthStore()
const etatsStore = useEtatsGeneraux()
const loginError = ref('')
const errorMessage = ref('')
const router = useRouter()

onMounted(() => {
  href.value = etatsStore.redirectLink
})
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    loginError.value = true
    errorMessage.value = 'Veuillez renseigner vos identifients !'
  } else {
    try {
      await authStore.login({
        email: email.value,
        password: password.value,
      })
      if (authStore.isAuthenticated) {
        router.push(href.value || '/')
      }
    } catch (error) {
      error.value = 'identifiants incorrects !'
      loginError.value = true
      errorMessage.value = 'identifiants incorrects !'
    }
  }
}
</script>
<template>
  <div class="flex flex-col gap-5">
    <p class="text-red-600 text-center text-lg font-semibold">{{ errorMessage }}</p>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full">
      <input
        v-model="email"
        type="email"
        placeholder="email"
        class="p-3 border rounded-md outline-indigo-950"
        autocomplete=""
      />
      <input
        v-model="password"
        type="password"
        name=""
        id=""
        placeholder="mot de passe"
        class="p-3 border rounded-md outline-indigo-950"
      />
      <input
        type="submit"
        class="p-2 bg-indigo-950 hover:bg-indigo-800 rounded-md cursor-pointer font-semibold text-white text-xl"
        value="Se connecter"
      />
      <p class="text-center">
        Vous n'avez de compte ?
        <RouterLink to="/inscription" class="font-semibold text-pink-700 underline"
          >Inscrivez-vous !</RouterLink
        >
      </p>
    </form>
  </div>
</template>
