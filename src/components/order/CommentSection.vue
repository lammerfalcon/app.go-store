<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const productsStore = useProductsStore()

const { comment } = storeToRefs(productsStore)
</script>

<template>
  <section class="p-4 flex flex-col gap-2 bg-secondary rounded-xl">
    <Label for="comment">Комментарий к заказу:</Label>
    <Textarea id="comment" v-model="comment" placeholder="Напишите уточняющую информацию" />
    <p class="text-sm text-muted-foreground">
      Ваше сообщение получит продавец
    </p>
  </section>
</template>
