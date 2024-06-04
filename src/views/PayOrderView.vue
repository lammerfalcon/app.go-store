<script setup lang="ts">
import IndividualPayment from '@/components/order/IndividualPayment.vue'
import CommentSection from '@/components/order/CommentSection.vue'
import OrderSummary from '@/components/order/OrderSummary.vue'
</script>

<template>
  <div class="min-h-screen max-w-[380px] mx-auto flex flex-col gap-6">
    <IndividualPayment />
    <CommentSection />
    <OrderSummary />
  </div>
</template>
