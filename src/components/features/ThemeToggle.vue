<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const isDark = ref(true)

onMounted(() => {
  const isDarkStored =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

  isDark.value = isDarkStored
  localStorage.setItem('theme', isDarkStored ? 'dark' : 'light')

  document.documentElement.classList.toggle('dark', isDarkStored)
  document.body.classList.toggle('dark', isDarkStored)
  document.getElementById('app')?.classList.toggle('dark', isDarkStored)

  const btn = document.querySelector('.flow-btn')
  if (!btn) return

  let flowTween

  btn.addEventListener('mouseenter', () => {
    // reset + play flow
    flowTween?.kill()

    flowTween = gsap.to(btn, {
      scale: '1.2',
      duration: 1,
      ease: 'power2.out',
    })
  })

  btn.addEventListener('mouseleave', () => {
    flowTween?.kill()
    gsap.to(btn, {
      scale: '1',
      duration: 0.8,
      ease: 'power2.out',
    })
  })
})

const iconRef = ref(null)

const toggleTheme = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      isDark.value = !isDark.value
      gsap.fromTo(
        iconRef.value,
        { rotation: -180, opacity: 0, scale: 0.5 },
        { rotation: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
      )
    },
  })

  tl.to(iconRef.value, {
    rotation: 180,
    opacity: 0,
    scale: 0.5,
    duration: 0.3,
    ease: 'power2.in',
  })

  const newIsDark = !isDark.value
  const root = document.documentElement
  const app = document.getElementById('app')
  const body = document.body

  if (newIsDark) {
    root.classList.add('dark')
    app?.classList.add('dark')
    body?.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    app?.classList.remove('dark')
    body?.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <div
    class="group h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 p-0.5 shadow-xl transition-shadow hover:shadow-pink-400/50 hover:dark:shadow-purple-500/50"
  >
    <button
      class="flex h-full w-full items-center justify-center rounded-full bg-stone-50 text-pink-400 dark:bg-stone-900 dark:text-purple-500"
      @click="toggleTheme"
    >
      <div ref="iconRef">
        <i v-if="isDark" class="fa-solid fa-moon"></i>
        <i v-else class="fa-solid fa-sun"></i>
      </div>
    </button>
  </div>
</template>
