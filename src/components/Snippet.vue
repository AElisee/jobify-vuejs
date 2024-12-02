<script setup>
const { message } = defineProps({
  message: {
    type: String,
    default: 'Patientez un instant !',
  },
})
</script>
<template>
  <div class="fixed top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] z-10 border">
    <div class="w-[600px] h-[300px] rounded-md bg-indigo-50 flex justify-center items-center">
      <p class="text-2xl text-indigo-950 font-semibold">{{ message }}</p>
    </div>
  </div>
</template>
