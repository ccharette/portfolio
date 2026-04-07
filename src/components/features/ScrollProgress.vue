<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const progressRef = ref(null)

onMounted(() => {
  gsap.to(progressRef.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3, // matches useSpring's responsiveness
    },
  })
})
</script>

<template>
  <div
    ref="progressRef"
    class="fixed top-0 right-0 left-0 z-[100] h-1 origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500"
    style="transform: scaleX(0)"
  />
</template>
