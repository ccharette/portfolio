<script setup>
import { useTheme } from '@/composables/features/theme'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const { isDark, toggleTheme: toggleThemeState } = useTheme()

const buttonRef = ref(null)

onMounted(() => {
  let flowTween

  buttonRef.value.addEventListener('mouseenter', () => {
    // reset + play flow
    flowTween?.kill()

    flowTween = gsap.to(buttonRef.value, {
      scale: '1.2',
      duration: 1,
      ease: 'power2.out',
    })
  })

  buttonRef.value.addEventListener('mouseleave', () => {
    flowTween?.kill()
    gsap.to(buttonRef.value, {
      scale: '1',
      duration: 0.8,
      ease: 'power2.out',
    })
  })
})
</script>

<template>
  <div
    ref="buttonRef"
    class="group h-16 w-16 rounded-full bg-linear-to-br from-purple-500 to-pink-400 p-0.5 shadow-xl transition-shadow hover:shadow-pink-400/50 hover:dark:shadow-purple-500/50"
  >
    <button
      class="flex h-full w-full items-center justify-center rounded-full bg-stone-50 text-pink-400 dark:bg-stone-900 dark:text-purple-500"
      @click="toggleThemeState"
    >
      <div>
        <i v-if="isDark" class="fa-solid fa-moon"></i>
        <i v-else class="fa-solid fa-sun"></i>
      </div>
    </button>
  </div>
</template>
