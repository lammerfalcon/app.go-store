<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { shopConfig } = storeToRefs(userStore)
</script>

<template>
  <div v-if="shopConfig?.greeting_text" class="col-span-2 rounded-xl text-secondary shadow-md bg-primary/80 p-4 text-lg  font-extralight tracking-wide">
    {{ shopConfig?.greeting_text }}
  </div>
</template>

<style scoped>

</style>
