<script setup>
import { Container } from '@/components/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  description: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
})

const sectionEl = ref(null)
const headerRef = ref(null)

defineExpose({
  $el: sectionEl,
})

let scrollCtx

onMounted(() => {
  scrollCtx = gsap.context(() => {
    gsap.from(headerRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionEl.value)
})

onUnmounted(() => {
  if (scrollCtx) {
    scrollCtx.revert()
  }
})
</script>

<template>
  <section ref="sectionEl" :class="{ 'bg-stone-200 dark:bg-stone-900': !dark, 'bg-stone-900': dark }">
    <Container class="flex flex-col items-center justify-center space-y-12 py-28">
      <div ref="headerRef" class="space-y-4 text-center">
        <h2
          :class="[
            'bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl',
            {
              'from-gray-900 to-gray-600 dark:from-white dark:to-stone-400': !dark,
              'from-white to-stone-400': dark,
            },
          ]"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          :class="[
            'max-w-3xl',
            {
              'text-gray-600 dark:text-stone-400': !dark,
              'text-stone-400': dark,
            },
          ]"
        >
          {{ description }}
        </p>
      </div>
      <slot />
    </Container>
  </section>
</template>
