<script setup>
defineProps({
  small: Boolean,
})
</script>

<template>
  <div
    :class="[
      'mx-auto w-[calc(100%-2rem)]',
      {
        'max-w-3xl': small,
        'max-w-6xl': !small,
      },
    ]"
  >
    <slot />
  </div>
</template>

<style scoped></style>
