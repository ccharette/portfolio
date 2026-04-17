<script setup>
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'
import { BaseSection, ColorfulCard } from '@/components/ui/index.js'

const timelineItems = ref([])
const sectionRef = ref(null)

const title = 'Mon parcours'

const timeline = [
  {
    year: '2018',
    title: 'Début Laravel & Vue.js',
    description: 'Premier projet en Laravel et Vue.js',
    tech: ['Laravel', 'Vue.js', 'Bootstrap'],
    icon: 'fa-solid fa-code',
    color: 'from-violet-500 to-purple-500',
  },
  {
    year: '2018-2019',
    title: 'AEC Intégration multimédia',
    location: 'College Lasalle',
    tech: ['CSS', 'HTML', 'JavaScript', 'PHP', 'WordPress'],
    description: 'Initiation au développement web. Formation sur l’intégration multimédia',
    projects: ['Photoshop', 'Animation 3D', 'Site web'],
    icon: 'fa-solid fa-graduation-cap',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2019-2020',
    title: 'Développeuse full-stack',
    location: 'CL Innovation',
    tech: ['HTML', 'CSS', 'PHP', 'JavaScript'],
    description: 'Développement d’application web, coordination entre équipe TI et développeurs',
    projects: ['Rapport clinique', 'Borne de paiement'],
    icon: 'fa-solid fa-briefcase',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    year: '2020-2023',
    title: 'Développeuse full-stack et directrice web',
    location: 'Gallea',
    tech: ['Laravel', 'Vue.js', 'Tailwind CSS'],
    description:
      'Développement d’application web, gestion de projets, conception produit, gestion d’équipe, code review, gestion de serveurs et projets techniques',
    projects: ["Gallerie d'art", 'Exposition', 'E-Commerce'],
    icon: 'fa-solid fa-briefcase',
    color: 'from-green-500 to-lime-500',
  },
  {
    year: '2023-Présentement',
    title: 'Développeuse full-stack Sénior',
    location: 'Swoo',
    tech: ['Laravel', 'Vue.js', 'Tailwind CSS'],
    description: 'Développement d’application web, optimisation UX, code review, code review, lead projet, mentorat',
    projects: ['SASS foodtech', 'WeCook', 'Vue mastery'],
    icon: 'fa-solid fa-briefcase',
    color: 'from-yellow-400 to-amber-400',
  },
  {
    year: 'Présentement',
    title: "Initialisation d'un portfolio",
    description:
      'Définition d’une ligne directrice, exploration d’outils IA (Figma et Junie) et création de prototypes fonctionnels.',
    tech: ['Vue.js', 'TailwindCSS', 'Librairie d’animation'],
    icon: 'fa-solid fa-code',
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
  }, sectionRef.value.$el)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <BaseSection ref="sectionRef" :description :title>
    <!-- Background decoration -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl dark:bg-purple-500/5" />
      <div class="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-500/5" />
    </div>

    <!-- Timeline -->
    <div class="relative max-sm:mt-12">
      <!-- Vertical line -->
      <div
        class="max-xs:-translate-x-1/2 absolute -top-12 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-purple-500/50 via-emerald-500/50 to-amber-500/50 sm:top-0 sm:left-8 md:left-1/2"
      />

      <div class="space-y-12">
        <div
          v-for="(item, index) in timeline"
          :key="item.year"
          ref="timelineItems"
          :class="[
            'relative flex w-full max-w-5xl flex-row items-center will-change-[transform,opacity]',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
          ]"
        >
          <!-- Content card -->
          <div :class="['content-card flex-1 sm:pl-14 md:pl-0', index % 2 === 0 ? 'md:pr-12' : 'md:pl-12']">
            <div class="group relative transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
              <ColorfulCard :color-classes="item.color">
                <div
                  :class="[
                    'mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white',
                    item.color,
                  ]"
                >
                  {{ item.year }}
                </div>

                <span
                  v-if="item.location"
                  class="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 dark:text-stone-400"
                >
                  <i class="fa-solid fa-location-dot" />
                  {{ item.location }}
                </span>
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {{ item.title }}
                </h3>
                <span v-if="item.tech" class="mb-2 text-sm text-gray-500 dark:text-stone-500">
                  {{ item.tech.join(', ') }}
                </span>
                <p class="mb-3 text-gray-600 dark:text-stone-400">
                  {{ item.description }}
                </p>
                <div v-if="item.projects" class="flex space-x-2">
                  <span
                    v-for="project in item.projects"
                    :key="project"
                    class="rounded-full border border-stone-200 bg-gray-200 px-3 py-1 text-xs text-stone-200 dark:border-stone-500 dark:bg-stone-700"
                  >
                    {{ project }}
                  </span>
                </div>
              </ColorfulCard>
            </div>
          </div>

          <!-- Center icon -->
          <div
            class="center-icon absolute left-1/2 z-10 -translate-x-1/2 max-sm:-top-8 sm:left-0 sm:block sm:translate-0 md:left-1/2 md:-translate-x-1/2"
          >
            <div :class="['h-16 w-16 rounded-full bg-gradient-to-br p-0.5 shadow-xl', item.color]">
              <div class="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-stone-900">
                <i :class="[item.icon, 'bg-gradient-to-br bg-clip-text text-2xl text-transparent', item.color]"></i>
              </div>
            </div>
          </div>

          <!-- Spacer for alternating layout -->
          <div class="hidden flex-1 md:block" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <!--    <div class="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">-->
    <!--      <div-->
    <!--        v-for="stat in stats"-->
    <!--        :key="stat.label"-->
    <!--        ref="statsItems"-->
    <!--        class="cursor-default rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:border-stone-700/50 dark:bg-stone-800/30"-->
    <!--      >-->
    <!--        <div class="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">-->
    <!--          <AnimatedCounter :end="stat.value" :suffix="stat.suffix" />-->
    <!--        </div>-->
    <!--        <div class="text-sm text-gray-600 dark:text-stone-400">-->
    <!--          {{ stat.label }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </BaseSection>
</template>

<style scoped></style>
