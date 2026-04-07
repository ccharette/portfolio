<script setup>
defineProps({
  colorClasses: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    :class="[
      'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10',
      colorClasses,
    ]"
  />

  <div
    class="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-md backdrop-blur-xl transition-all duration-500 hover:border-gray-300 hover:shadow-2xl dark:border-stone-700/50 dark:bg-stone-900/50 hover:dark:border-stone-600/50"
  >
    <slot />
  </div>
</template>

<style scoped></style>
