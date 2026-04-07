<script setup>
import { BaseSection, ListBullet, ProgressBar } from '@/components/ui'
import { ColorfulCard } from '@/components/ui/index.js'

const skills = [
  {
    icon: 'fa-solid fa-code',
    percentage: 90,
    title: 'Front-end',
    level: 'Expert',
    color: 'from-rose-500 to-pink-500',
    borderColor: 'border-rose-500/20',
    glowColor: 'shadow-rose-500/20',
    description: "Vue.js, logique d'application, intégration de maquettes",
    details: [
      'Architecture de composants',
      "Gestion d'état complexe",
      'UX plutôt que UI/animations',
    ],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Back-end',
    level: 'Avancé',
    percentage: 85,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/20',
    glowColor: 'shadow-emerald-500/20',
    description: 'Laravel, architecture serveur, APIs',
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
    details: [
      'Intégration front-back fluide',
      'Optimisation de performance',
      'Architecture globale',
    ],
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
  <BaseSection title="Expertise technique">
    <div class="grid w-full grid-cols-2 gap-6">
      <div v-for="skill in skills" :key="skill.title" class="group relative w-full">
        <ColorfulCard :color-classes="skill.color">
          <div class="flex items-center justify-between">
            <span :class="['rounded-xl bg-gradient-to-br p-4 shadow-lg', skill.color]">
              <i :class="['text-2xl text-white', skill.icon]" />
            </span>
            <div>
              <div
                :class="[
                  'bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent',
                  skill.color,
                ]"
              >
                {{ skill.percentage }}%
              </div>
              <div class="text-right text-xs text-gray-600 dark:text-stone-400">
                {{ skill.level }}
              </div>
            </div>
          </div>
          <p class="mt-6 text-lg font-bold">
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
          <ul class="mt-6 space-y-2">
            <ListBullet
              v-for="(bullet, i) in skill.details"
              :key="i"
              :color="`bg-gradient-to-br ${skill.color}`"
            >
              <p class="text-xs text-stone-700 dark:text-stone-300">
                {{ bullet }}
              </p>
            </ListBullet>
          </ul>
        </ColorfulCard>
      </div>
    </div>
  </BaseSection>
</template>
