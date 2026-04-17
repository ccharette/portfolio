<script setup>
import { BaseCard } from '@/components/ui'

defineProps({
  colorClasses: {
    type: String,
    default: '',
  },
  padding: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="group relative">
    <div
      :class="[
        'absolute inset-0 z-1 rounded-2xl bg-linear-to-r opacity-0 blur-xl transition-opacity duration-300 will-change-[opacity] group-hover:opacity-10 pointer-events-none',
        colorClasses,
      ]"
    />

    <BaseCard
      :class="[
        'hover:bg-opacity-25 flex h-full flex-col overflow-hidden shadow-md backdrop-blur-xl hover:shadow-2xl',
        { 'p-6': padding },
      ]"
    >
      <slot />
    </BaseCard>
  </div>
</template>
