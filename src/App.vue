<script setup lang="ts">
import { BackButton } from 'vue-tg'
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import router from '@/router'

const mode = useColorMode()

function handleBackButton() {
  router.push('/')
}
const showBackButton = computed(() => {
  return router.currentRoute.value.path !== '/'
})
</script>

<template>
  <div class="p-4 max-w-[1280px] mx-auto">
    <BackButton v-if="showBackButton" @click="handleBackButton" />
    <RouterView />
  </div>
  <!--  <Confirm v-if="showConfirm === true" message="Hello?" @close="handleConfirmClose" /> -->
</template>

<style scoped>
</style>
