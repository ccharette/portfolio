<script setup>
defineProps({
  colorClasses: {
    type: String,
    default: 'bg-neutral-600',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul class="space-y-2">
    <li v-for="(item, index) in items" :key="index" class="relative ml-3 flex items-center">
      <span :class="['absolute -left-3 size-1 rounded-full', colorClasses]" />
      <slot :item="item" />
    </li>
  </ul>
</template>
