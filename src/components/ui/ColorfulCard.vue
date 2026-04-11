<script setup>
import { BaseCard } from '@/components/ui'

defineProps({
  colorClasses: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="relative">
    <div
      :class="[
        'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 will-change-[opacity] group-hover:opacity-20',
        colorClasses,
      ]"
    />

    <BaseCard class="flex h-full flex-col overflow-hidden p-8 shadow-md backdrop-blur-xl hover:shadow-2xl">
      <slot />
    </BaseCard>
  </div>
</template>

<style scoped></style>
