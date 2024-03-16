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
    <!--    TODO: persisted state with basket clear -->
    <!--    <Button class="fixed top-5 left-5 z-50 bg-primary/80"> -->
    <!--      <span class="opacity-100"> -->
    <!--        Очистить корзину -->
    <!--      </span> -->
    <!--    </Button> -->
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <!--  <Confirm v-if="showConfirm === true" message="Hello?" @close="handleConfirmClose" /> -->
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(0, 120px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(0, -120px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(0, -120px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(0, 120px);
}
</style>
