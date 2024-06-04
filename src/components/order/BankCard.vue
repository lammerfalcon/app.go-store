<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import CopyIcon from '@/components/ui/icons/CopyIcon.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { shopConfig } = storeToRefs(userStore)

const { copy, copied } = useClipboard()
</script>

<template>
  <div
    v-if="shopConfig?.card"
    class="w-full max-w-[380px] aspect-[1.6/1] bg-gradient-to-r p-6 from-slate-700 via-gray-500 to-slate-700 rounded-lg shadow-lg flex  outline-1 outline outline-gray-500 flex-col gap-6"
  >
    <div class="flex flex-col items-start">
      <h4 class="uppercase text-white text-xs">
        Наименование банка:
      </h4>
      <div class="text-xl text-secondary">
        {{ shopConfig?.card?.number }}
      </div>
    </div>
    <button
      class="text-secondary flex flex-row justify-between items-center cursor-pointer active:bg-gray-800/60 p-1 ring-1 active:ring-gray-600 ring-gray-700 rounded-md"
      @click="copy(shopConfig?.card.number)"
    >
      <span v-if="!copied" class="block">
        <span class="block uppercase tracking-wider text-start font-semibold text-sm">
          Номер карты
        </span>
        <span class="block text-start text-xl">
          {{ shopConfig?.card.number }}
        </span>
      </span>
      <span v-if="copied" class="block">
        <span class="tuppercase tracking-wider font-semibold text-sm" />
        <span class=" text-xl">
          Скопировали 🎉
        </span>
      </span>
      <div class="py-2">
        <CopyIcon width="2rem" height="2rem" />
      </div>
    </button>
    <div
      class="text-secondary flex flex-col self-end"
    >
      <h4 class="uppercase text-xs">
        Имя держателя карты
      </h4>
      <h1 class="">
        {{ shopConfig?.card?.holder }}
      </h1>
    </div>
  </div>
</template>

<style scoped>

</style>
