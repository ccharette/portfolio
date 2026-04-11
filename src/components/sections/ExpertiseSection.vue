<script setup>
import { BaseSection, ColorfulCard, ListBullet, ProgressBar } from '@/components/ui'

const title = 'Expertise technique'
const description =
  "Ma maîtrise technique couvre une gamme de technologies et domaines, depuis le front-end jusqu'au back-end, en passant par la gestion et la sécurité. Je suis capable de concevoir, développer et optimiser des applications web robustes et performantes."

const skills = [
  {
    icon: 'fa-solid fa-code',
    percentage: 90,
    title: 'Front-end',
    level: 'Expert',
    color: 'from-rose-500 to-pink-500',
    borderColor: 'border-rose-500/20',
    glowColor: 'shadow-rose-500/20',
    description: 'Javascript, HTML, Vue.js, Tailwind CSS',
    details: ["Architecture d'applications", 'Intégration de maquettes', "Optimisation de l'expérience utilisateur"],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Back-end',
    level: 'Avancé',
    percentage: 75,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/20',
    glowColor: 'shadow-emerald-500/20',
    description: 'PHP, MySQL, Laravel',
    details: ['Développement Laravel', 'Architecture de bases de données', 'APIs RESTful'],
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Full Stack',
    level: 'Exceptionnel',
    percentage: 98,
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/20',
    glowColor: 'shadow-purple-500/20',
    description: 'Vision bout en bout, optimisation',
    details: ['Intégration front-back fluide', 'Optimisation de performance', 'Architecture globale'],
  },
  {
    icon: 'fa-solid fa-cubes',
    title: 'DevOps & Gestion',
    level: 'Compétent',
    percentage: 80,
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/20',
    glowColor: 'shadow-amber-500/20',
    description: 'Serveurs, équipes, projets',
    details: ['Gestion de serveurs', 'Lead technique & code review', "Gestion d'équipe et projets"],
  },
]
</script>

<template>
  <BaseSection :description :title>
    <div class="grid w-full grid-cols-2 gap-6">
      <div v-for="skill in skills" :key="skill.title" class="group relative w-full">
        <ColorfulCard :color-classes="skill.color">
          <div class="flex items-center justify-between">
            <span :class="['rounded-xl bg-linear-to-br p-4 shadow-lg', skill.color]">
              <i :class="['text-2xl text-white', skill.icon]" />
            </span>
            <div>
              <div :class="['bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent', skill.color]">
                {{ skill.percentage }}%
              </div>
              <div class="text-right text-xs text-gray-600 dark:text-stone-400">
                {{ skill.level }}
              </div>
            </div>
          </div>
          <p class="mt-6 text-lg font-bold text-stone-600 dark:text-stone-100">
            {{ skill.title }}
          </p>
          <p class="text-xs text-stone-600 dark:text-stone-400">
            {{ skill.description }}
          </p>
          <ProgressBar
            :background-classes="`bg-gradient-to-r ${skill.color}`"
            :percentage="skill.percentage"
            class="mt-4"
          />
          <ListBullet :color-classes="`bg-gradient-to-br ${skill.color}`" :items="skill.details" class="mt-6">
            <template v-slot="{ item }">
              <p class="text-xs text-stone-700 dark:text-stone-300">
                {{ item }}
              </p>
            </template>
          </ListBullet>
        </ColorfulCard>
      </div>
    </div>
  </BaseSection>
</template>
