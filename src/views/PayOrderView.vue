<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import IndividualPayment from '@/components/order/IndividualPayment.vue'
import CommentSection from '@/components/order/CommentSection.vue'
import OrderSummary from '@/components/order/OrderSummary.vue'
import { useUserStore } from '@/stores/user'
import YoomoneyPayment from '@/components/order/YoomoneyPayment.vue'

const userStore = useUserStore()
const { paymentType } = storeToRefs(userStore)
const paymentInfoCard = computed(() => {
  return paymentType.value === 'card' ? { component: IndividualPayment } : { component: YoomoneyPayment }
})
</script>

<template>
  <div class="min-h-screen max-w-[380px] mx-auto flex flex-col gap-6">
    <!--    <IndividualPayment /> -->
    <component :is="paymentInfoCard.component" />
    <CommentSection />
    <OrderSummary />
  </div>
</template>
