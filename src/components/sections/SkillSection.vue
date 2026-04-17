<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BaseSection, ProgressBar } from '@/components/ui/index.js'

const title = 'Compétences détaillées'
const description = "7+ années d'expérience en développement full stack"

const activeCategory = ref('frontend')
const sectionRef = ref(null)
const tabsRef = ref(null)
const skillsGridRef = ref(null)

const categories = [
  { id: 'frontend', label: 'Front-end', icon: 'fa-solid fa-palette' },
  { id: 'backend', label: 'Back-end', icon: 'fa-solid fa-database' },
  { id: 'tools', label: 'Outils', icon: 'fa-solid fa-terminal' },
  { id: 'soft', label: 'Management', icon: 'fa-solid fa-users' },
]

const skills = {
  frontend: [
    { name: 'Vue.js', level: 85, color: 'from-emerald-500 to-teal-500' },
    { name: 'JavaScript/ES6+', level: 90, color: 'from-yellow-500 to-amber-500' },
    { name: 'HTML/CSS', level: 75, color: 'from-blue-500 to-cyan-500' },
    { name: 'TailwindCSS', level: 80, color: 'from-purple-500 to-pink-500' },
    { name: "Logique d'application", level: 95, color: 'from-rose-500 to-pink-500' },
  ],
  backend: [
    { name: 'Laravel', level: 75, color: 'from-red-500 to-orange-500' },
    { name: 'PHP', level: 70, color: 'from-indigo-500 to-purple-500' },
    { name: 'MySQL/PostgreSQL', level: 55, color: 'from-blue-500 to-indigo-500' },
    { name: 'REST APIs', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'Architecture', level: 85, color: 'from-cyan-500 to-blue-500' },
  ],
  tools: [
    { name: 'Git', level: 85, color: 'from-orange-500 to-red-500' },
    { name: 'DevOps', level: 70, color: 'from-blue-500 to-purple-500' },
    { name: 'Gestion serveur', level: 75, color: 'from-green-500 to-teal-500' },
    { name: 'CI/CD', level: 75, color: 'from-violet-500 to-purple-500' },
    { name: 'Code Review', level: 85, color: 'from-pink-500 to-rose-500' },
  ],
  soft: [
    { name: 'Leadership technique', level: 75, color: 'from-purple-500 to-pink-500' },
    { name: "Gestion d'équipe", level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Gestion de projet', level: 85, color: 'from-emerald-500 to-green-500' },
    { name: 'Mentorat', level: 80, color: 'from-amber-500 to-orange-500' },
    { name: 'Communication', level: 90, color: 'from-rose-500 to-pink-500' },
  ],
}

let scrollCtx

onMounted(() => {
  scrollCtx = gsap.context(() => {
    gsap.from(tabsRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.2,
      scrollTrigger: {
        trigger: tabsRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    animateSkills()
  }, sectionRef.value?.$el)
})

onUnmounted(() => {
  if (scrollCtx) scrollCtx.revert()
})

const setActiveCategory = (id) => {
  if (activeCategory.value === id) {
    return
  }

  activeCategory.value = id

  // Center the active tab on mobile
  const activeTab = tabsRef.value.children[categories.findIndex((c) => c.id === id)]
  if (activeTab) {
    activeTab.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  nextTick(() => {
    animateSkills()
    ScrollTrigger.refresh()
  })
}

const animateSkills = () => {
  if (!skillsGridRef.value) return
  const items = skillsGridRef.value.querySelectorAll('.skill-item')

  gsap.fromTo(
    items,
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      clearProps: 'all',
    },
  )
}
</script>

<template>
  <BaseSection ref="sectionRef" dark :description :title>
    <div
      ref="tabsRef"
      class="mb-12 flex w-full max-w-full gap-4 overflow-x-auto px-1 py-0.5 pb-4 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        :class="[
          activeCategory === category.id
            ? 'scale-105 bg-stone-200 text-stone-900 dark:bg-white/10 dark:text-white'
            : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 dark:bg-white/5 dark:text-stone-400 dark:hover:bg-white/8 dark:hover:text-white',
          'group relative flex-shrink-0 rounded-xl px-4 py-3 transition-all duration-300 sm:px-6',
        ]"
        @click="setActiveCategory(category.id)"
      >
        <div class="flex items-center gap-2">
          <i :class="['flex w-5 items-center justify-center', category.icon]"></i>
          <span class="sm:text-md text-sm font-medium">{{ category.label }}</span>
        </div>
        <Transition name="tab-border">
          <div
            v-if="activeCategory === category.id"
            class="absolute inset-0 rounded-xl border-2 border-stone-300 dark:border-white/20"
          ></div>
        </Transition>
      </button>
    </div>

    <div :key="activeCategory" ref="skillsGridRef" class="w-full max-w-3xl space-y-4 will-change-[transform,opacity]">
      <div v-for="skill in skills[activeCategory]" :key="skill.name" class="skill-item group relative">
        <div
          class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm backdrop-blur-xl transition-colors hover:border-stone-300 dark:border-stone-700/50 dark:bg-stone-800/50 dark:hover:border-stone-600/50"
        >
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-sm font-semibold text-stone-900 sm:text-lg dark:text-white">{{ skill.name }}</h3>
            <span
              :class="['bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent sm:text-2xl', skill.color]"
            >
              {{ skill.level }}%
            </span>
          </div>

          <ProgressBar :background-classes="`bg-gradient-to-r ${skill.color}`" :percentage="skill.level" />
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.overflow-x-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.tab-border-enter-active,
.tab-border-leave-active {
  transition: opacity 0.3s ease;
}
.tab-border-enter-from,
.tab-border-leave-to {
  opacity: 0;
}
</style>
