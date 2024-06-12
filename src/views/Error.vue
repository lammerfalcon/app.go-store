<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const store = useUserStore()
const { user } = storeToRefs(store)
onMounted(() => {
  if (user.value)
    router.push('/')
})
</script>

<template>
  <section class="flex flex-col items-center justify-start mt-40 h-full bg-background text-foreground gap-2">
    <span class="text-4xl">😔</span>
    <div class="flex items-center flex-col justify-center mx-auto text-center tracking-wide gap-2">
      <h1 class="text-2xl font-medium tracking-wide">
        Магазин временно не&nbsp;работает
      </h1>
      <p class="tracking-wider mt-3">
        Мы стараемся решить проблему как можно скорее!
      </p>
      <p class="tracking-wider">
        В данный момент вы можете написать продавцу напрямую
      </p>
    </div>
    <span class="text-sm fixed bottom-10">
      Сделано с помощью
      <a class="font-semibold text-blue-500 underline" href="https://go-store.space/">go-store</a>
    </span>
  </section>
</template>

<style scoped>

</style>
