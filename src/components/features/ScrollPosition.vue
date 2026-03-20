<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const scrollProgress = ref(0)
const MIN_SCALE = 0.1
const TOTAL_LINES = 10

const updateScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.body.scrollHeight - window.innerHeight
  scrollProgress.value = scrollTop / docHeight
}

onMounted(() => window.addEventListener('scroll', updateScroll))

onUnmounted(() => window.removeEventListener('scroll', updateScroll))

const getLineWidth = (index) => {
  const step = Math.floor(scrollProgress.value * TOTAL_LINES)

  const current = Math.min(step, TOTAL_LINES - 1)
  const distance = Math.abs(index - current)

  const width = 100 - distance * 25

  return Math.max(width, 0)
}

const getScaledWidth = (index) => {
  const raw = getLineWidth(index) / 100

  return Math.max(raw, MIN_SCALE)
}

const getOpacity = (index) => {
  const step = Math.floor(scrollProgress.value * TOTAL_LINES)
  const distance = Math.abs(index - step)

  return Math.max(1 - distance * 0.25, 0.15)
}
</script>

<template>
  <div
    class="flex-col rounded-full bg-neutral-300 py-6 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600"
  >
    <div class="mx-auto w-5 space-y-2">
      <div
        v-for="i in 10"
        :key="i"
        class="h-1 w-full overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-800"
      >
        <div
          class="h-full origin-center bg-neutral-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          :style="{
            transform: `scaleX(${getScaledWidth(i - 1)})`,
            opacity: getOpacity(i - 1),
          }"
        />
      </div>
    </div>
  </div>
</template>
