<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  backgroundClasses: {
    type: String,
    required: true,
  },
})

const progressBar = ref(null)
const shimmerBar = ref(null)

let ctx

onMounted(() => {
  if (!progressBar.value || !shimmerBar.value) return

  ctx = gsap.context(() => {
    gsap.to(progressBar.value, {
      width: `${props.percentage}%`,
      duration: 1,
      delay: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: progressBar.value,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    gsap.to(shimmerBar.value, {
      x: '200%',
      duration: 2,
      repeat: -1,
      ease: 'none',
      delay: 0.2,
    })
  }, progressBar.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div class="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-stone-700">
    <div
      ref="progressBar"
      :class="['relative h-full overflow-hidden rounded-full will-change-[width]', backgroundClasses]"
      style="width: 0%"
    >
      <div
        ref="shimmerBar"
        class="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style="transform: translateX(-100%)"
      ></div>
    </div>
  </div>
</template>
