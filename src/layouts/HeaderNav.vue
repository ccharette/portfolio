<script setup>
import { scrollTo } from '@/composables/utils/scroll.js'

const navigations = [
  { label: 'a propos', href: '#about' },
  { label: 'projets', href: '#projects' },
  { label: 'contact', href: '#contact' },
]
</script>

<template>
  <nav
    class="sticky top-0 h-12 bg-neutral-900 text-stone-500 uppercase dark:bg-stone-900 dark:text-stone-400"
  >
    <div class="mx-auto flex h-full w-[calc(100%-2rem)] max-w-6xl items-center justify-between">
      <span class="font-bold">CCHARETTE.DEV</span>
      <div class="grid grid-cols-3 gap-4">
        <a
          v-for="navigation in navigations"
          :key="navigation.href"
          class="cursor-pointer hover:text-stone-800 dark:hover:text-stone-300"
          @click="scrollTo(navigation.href)"
        >
          {{ navigation.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
