<script setup>
const navigations = [
  { label: 'a propos', href: '#about' },
  { label: 'projets', href: '#projects' },
  { label: 'contact', href: '#contact' },
]
</script>

<template>
  <nav
    class="sticky top-0 h-12 bg-stone-200 text-stone-500 uppercase dark:bg-stone-900 dark:text-stone-400"
  >
    <div class="mx-auto flex h-full max-w-6xl items-center justify-between">
      <span class="font-bold">CCHARETTE.DEV</span>
      <div class="grid grid-cols-3 gap-4">
        <a
          v-for="navigation in navigations"
          :key="navigation.href"
          :href="navigation.href"
          class="hover:text-stone-800 dark:hover:text-stone-300"
        >
          {{ navigation.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
