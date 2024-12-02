<script setup>
import SignupForm from '@/components/SignupForm.vue'
</script>
<template>
  <div class="px-app flex h-[80vh] items-center">
    <div
      class="w-1/2 p-3 bg-slate-100/35 rounded-md h-full flex flex-col justify-center items-center"
    >
      <h3
        class="px-4 mb-2 bg-gradient-to-b from-pink-800 to-indigo-950 bg-clip-text text-2xl font-bold text-transparent sm:mb-4 lg:text-3xl sm:leading-tight"
      >
        Inscription à Jobify
      </h3>
      <p class="text-center">
        votre espace dédié à la recherche d’opportunités professionnelles et à la mise en relation
        avec des talents.
      </p>
    </div>
    <div class="w-1/2 p-4">
      <SignupForm />
    </div>
  </div>
</template>
