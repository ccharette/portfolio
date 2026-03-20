<script setup>
import { onMounted, ref } from 'vue'

const isDark = ref(true)

onMounted(() => {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')

  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  )
})

const toggleTheme = () => {
  isDark.value = !isDark.value

  const root = document.documentElement
  const app = document.getElementById('app')

  if (isDark.value) {
    root.classList.add('dark')
    app?.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    app?.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <div>
    <button
      class="size-12 rounded-full bg-neutral-300 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600"
      @click="toggleTheme"
    >
      <i v-if="!isDark" class="fa-solid fa-moon"></i>
      <i v-else class="fa-solid fa-sun"></i>
    </button>
  </div>
</template>
