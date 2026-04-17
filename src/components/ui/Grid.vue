<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const sectionRef = ref(null)
const cardsRef = ref([])

let ctx

onMounted(() => {
  nextTick(() => {
    // Add a small delay to ensure all components are fully mounted
    setTimeout(() => {
      ctx = gsap.context(() => {
        const targets = cardsRef.value
          .filter((el) => el)
          .map((el) => {
            if (el.$el instanceof HTMLElement) return el.$el
            if (el instanceof HTMLElement) return el
            return null
          })
          .filter((el) => el)

        if (targets.length === 0) return // No targets to animate

        // Set initial state
        gsap.set(targets, { y: 200, opacity: 0 })

        // Animate when scrolled into view
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }, sectionRef.value)
    }, 100)
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="sectionRef" class="grid gap-6">
    <div v-for="(item, index) in items" :key="`${id}-${index}`" :ref="(el) => (cardsRef[index] = el)" class="h-full">
      <slot :item="item" />
    </div>
  </div>
</template>
