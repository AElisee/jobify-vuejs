<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:search'])
const searchQuery = ref('')

const { placeholder } = defineProps({
  placeholder: {
    type: String,
    default: 'Rechercher...',
  },
})

// Émettre l'événement à chaque changement de valeur
const updateSearch = () => {
  emit('update:search', searchQuery.value)
}
</script>

<template>
  <div>
    <form action="">
      <input
        class="min-w-[350px] p-2 rounded-md border outline-slate-400 placeholder:text-indigo-950"
        type="text"
        :placeholder="placeholder"
        v-model="searchQuery"
        @input="updateSearch"
      />
    </form>
  </div>
</template>
