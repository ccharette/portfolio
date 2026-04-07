<script setup>
import { AnimatedCounter } from '@/components/ui'
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'
import { ColorfulCard } from '@/components/ui/index.js'

const sectionRef = ref(null)
const headerRef = ref(null)
const timelineItems = ref([])
const statsItems = ref([])

const timeline = [
  {
    year: '2018',
    title: 'Début Laravel & Vue.js',
    description: "Immersion dans l'écosystème Laravel et Vue.js",
    icon: 'fa-solid fa-code',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2019-2020',
    title: 'Spécialisation Front-end',
    description: "Maîtrise approfondie de la logique d'application et architecture de composants",
    icon: 'fa-solid fa-briefcase',
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2021-2022',
    title: 'Full Stack Excellence',
    description: "Développement d'une expertise complète front-back avec Laravel",
    icon: 'fa-solid fa-arrow-trend-up',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    year: '2023-2026',
    title: 'Leadership & DevOps',
    description: "Gestion d'équipe, code review, gestion de serveurs et projets techniques",
    icon: 'fa-solid fa-calendar-days',
    color: 'from-amber-500 to-orange-500',
  },
]

const stats = [
  { label: "Années d'expérience", value: 7, suffix: '+' },
  { label: 'Projets complétés', value: 50, suffix: '+' },
  { label: 'Technologies maîtrisées', value: 15, suffix: '+' },
  { label: 'Équipes menées', value: 5, suffix: '+' },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Header animation
    gsap.from(headerRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Timeline items animation
    timelineItems.value.forEach((el, index) => {
      const isEven = index % 2 === 0
      const content = el.querySelector('.content-card')
      const icon = el.querySelector('.center-icon')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(content, {
        opacity: 0,
        x: isEven ? -50 : 50,
        duration: 0.8,
        ease: 'power3.out',
      }).from(
        icon,
        {
          scale: 0,
          rotation: -180,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.6',
      )
    })

    // Stats animation
    statsItems.value.forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-6 py-32 transition-colors duration-500 dark:from-stone-900 dark:to-stone-950"
  >
    <!-- Background decoration -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl dark:bg-purple-500/5"
      />
      <div
        class="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-500/5"
      />
    </div>

    <div class="relative mx-auto max-w-5xl">
      <div ref="headerRef" class="mb-20 text-center">
        <h2
          class="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl dark:from-white dark:to-stone-400"
        >
          Parcours Professionnel
        </h2>
        <p class="text-lg text-gray-600 dark:text-stone-400">Une évolution continue depuis 2018</p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-purple-500/50 via-emerald-500/50 to-amber-500/50 md:left-1/2"
        />

        <div class="space-y-12">
          <div
            v-for="(item, index) in timeline"
            :key="item.year"
            ref="timelineItems"
            :class="[
              'relative flex flex-row items-center',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
            ]"
          >
            <!-- Content card -->
            <div
              :class="[
                'content-card flex-1 pl-20 md:pl-0',
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12',
              ]"
            >
              <div
                class="group relative transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <ColorfulCard :color-classes="item.color">
                  <div
                    :class="[
                      'mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white',
                      item.color,
                    ]"
                  >
                    {{ item.year }}
                  </div>
                  <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {{ item.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-stone-400">
                    {{ item.description }}
                  </p>
                </ColorfulCard>
              </div>
            </div>

            <!-- Center icon -->
            <div class="center-icon absolute left-8 z-10 md:left-1/2 md:-translate-x-1/2">
              <div
                :class="['h-16 w-16 rounded-full bg-gradient-to-br p-0.5 shadow-xl', item.color]"
              >
                <div
                  class="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-stone-900"
                >
                  <i
                    :class="[item.icon, 'text-2xl']"
                    :style="{
                      backgroundImage:
                        'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    }"
                  ></i>
                </div>
              </div>
            </div>

            <!-- Spacer for alternating layout -->
            <div class="hidden flex-1 md:block" />
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          ref="statsItems"
          class="cursor-default rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:border-stone-700/50 dark:bg-stone-800/30"
        >
          <div
            class="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent"
          >
            <AnimatedCounter :end="stat.value" :suffix="stat.suffix" />
          </div>
          <div class="text-sm text-gray-600 dark:text-stone-400">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
