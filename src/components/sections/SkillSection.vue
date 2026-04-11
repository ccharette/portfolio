<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BaseSection, ProgressBar } from '@/components/ui/index.js'

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
    { name: 'Vue.js', level: 95, color: 'from-emerald-500 to-teal-500' },
    { name: 'JavaScript/ES6+', level: 90, color: 'from-yellow-500 to-amber-500' },
    { name: 'HTML/CSS', level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Intégration UX', level: 90, color: 'from-purple-500 to-pink-500' },
    { name: "Logique d'application", level: 98, color: 'from-rose-500 to-pink-500' },
  ],
  backend: [
    { name: 'Laravel', level: 90, color: 'from-red-500 to-orange-500' },
    { name: 'PHP', level: 88, color: 'from-indigo-500 to-purple-500' },
    { name: 'MySQL/PostgreSQL', level: 85, color: 'from-blue-500 to-indigo-500' },
    { name: 'REST APIs', level: 92, color: 'from-green-500 to-emerald-500' },
    { name: 'Architecture', level: 87, color: 'from-cyan-500 to-blue-500' },
  ],
  tools: [
    { name: 'Git', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'DevOps', level: 80, color: 'from-blue-500 to-purple-500' },
    { name: 'Gestion serveur', level: 82, color: 'from-green-500 to-teal-500' },
    { name: 'CI/CD', level: 78, color: 'from-violet-500 to-purple-500' },
    { name: 'Code Review', level: 93, color: 'from-pink-500 to-rose-500' },
  ],
  soft: [
    { name: 'Leadership technique', level: 88, color: 'from-purple-500 to-pink-500' },
    { name: "Gestion d'équipe", level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Gestion de projet', level: 87, color: 'from-emerald-500 to-green-500' },
    { name: 'Mentorat', level: 90, color: 'from-amber-500 to-orange-500' },
    { name: 'Communication', level: 86, color: 'from-rose-500 to-pink-500' },
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
  <BaseSection
    ref="sectionRef"
    dark
    description="7+ années d'expérience en développement full stack"
    title="Compétences Détaillées"
  >
    <div ref="tabsRef" class="mb-12 flex flex-wrap justify-center gap-4">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="
          activeCategory === category.id
            ? 'bg-white/10 text-white'
            : 'bg-white/5 text-stone-400 hover:bg-white/8 hover:text-white'
        "
        class="group relative rounded-xl px-6 py-3 transition-all duration-300"
        @click="setActiveCategory(category.id)"
      >
        <div class="flex items-center gap-2">
          <i :class="['flex h-5 w-5 items-center justify-center', category.icon]"></i>
          <span class="font-medium">{{ category.label }}</span>
        </div>
        <Transition name="tab-border">
          <div v-if="activeCategory === category.id" class="absolute inset-0 rounded-xl border-2 border-white/20"></div>
        </Transition>
      </button>
    </div>

    <div
      :key="activeCategory"
      ref="skillsGridRef"
      class="w-[calc(100%-2rem)] max-w-3xl space-y-4 will-change-[transform,opacity]"
    >
      <div v-for="skill in skills[activeCategory]" :key="skill.name" class="skill-item group relative">
        <div
          class="rounded-xl border border-stone-700/50 bg-stone-800/50 p-6 backdrop-blur-xl transition-colors hover:border-stone-600/50"
        >
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">{{ skill.name }}</h3>
            <span :class="['bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent', skill.color]">
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
.tab-border-enter-active,
.tab-border-leave-active {
  transition: opacity 0.3s ease;
}
.tab-border-enter-from,
.tab-border-leave-to {
  opacity: 0;
}
</style>
