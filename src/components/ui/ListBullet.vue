<script setup>
defineProps({
  color: {
    type: String,
    default: 'bg-neutral-600',
  },
})
</script>

<template>
  <li class="relative ml-3 flex items-center">
    <span :class="['absolute -left-3 size-1 rounded-full', color]" />
    <slot />
  </li>
</template>
