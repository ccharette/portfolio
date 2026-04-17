<script setup>
import { BaseSection, ColorfulCard, Grid } from '@/components/ui'

const title = 'Ce que je maîtrise'

const skills = [
  {
    icon: 'fa-solid fa-code',
    title: 'Front-end',
    color: 'from-rose-500 to-pink-500',
    borderColor: 'border-rose-500',
    technologies: ['Vue.js', 'JavaScript ES6+', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Back-end',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500',
    technologies: ['Laravel', 'PHP', 'REST APIs', 'MySQL'],
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Outils & infra',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500',
    technologies: ['Git', 'CI/CD', 'DevOps', 'Gestion serveur', 'Code Review'],
  },
  {
    icon: 'fa-solid fa-cubes',
    title: 'Gestion & Équipe',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500',
    technologies: ['Lead technique', 'Mentorat', 'Gestion de projet', 'Architecture'],
  },
]
</script>

<template>
  <BaseSection :title>
    <Grid id="expertise-grid" :items="skills" class="sm:grid-cols-2">
      <template v-slot="{ item: skill }">
        <ColorfulCard :color-classes="skill.color">
          <div class="flex items-center space-x-4">
            <div :class="['flex h-full grow flex-col justify-between space-y-3 border-l-2 pl-3', skill.borderColor]">
              <p class="text-lg font-bold text-stone-600 uppercase dark:text-stone-200">
                {{ skill.title }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="technology in skill.technologies"
                  :key="technology"
                  class="rounded-full bg-stone-700 px-2 py-1 text-sm text-stone-600 dark:text-stone-400"
                >
                  {{ technology }}
                </span>
              </div>
            </div>
          </div>
        </ColorfulCard>
      </template>
    </Grid>
  </BaseSection>
</template>
