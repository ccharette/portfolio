<script setup>
import { BaseSection, ColorfulCard, Grid } from '@/components/ui'

const title = 'Mes projets'

const projects = [
  {
    title: 'Ghost hunter',
    description:
      "Plateforme de kits repas avec gestion de menus, abonnements et livraisons. J'en suis la développeuse principale depuis 2023 — architecture, performance et évolution du produit.",
    type: 'Site vitrine',
    status: 'En cours',
    technologies: ['Vue.js', 'TailwindCSS'],
    color: 'from-purple-500 to-pink-500',
    link: 'https://ghost-hunter-murex.vercel.app/',
    image: 'ghost-hunter.png',
  },
  {
    title: 'Instax',
    description:
      "Plateforme de kits repas avec gestion de menus, abonnements et livraisons. J'en suis la développeuse principale depuis 2023 — architecture, performance et évolution du produit.",
    type: 'Application SASS ',
    status: 'En cours',
    technologies: ['Laravel', 'Vue.js', 'TailwindCSS'],
    color: 'from-emerald-500 to-teal-500',
    image: 'ghost-hunter.png',
  },
  {
    title: 'Local 4 - Syndicat',
    description:
      "Plateforme de kits repas avec gestion de menus, abonnements et livraisons. J'en suis la développeuse principale depuis 2023 — architecture, performance et évolution du produit.",
    type: 'Site vitrine',
    status: 'En cours',
    technologies: ['Vue.js', 'TailwindCSS'],
    color: 'from-amber-500 to-orange-500',
    image: 'ghost-hunter.png',
  },
]
</script>

<template>
  <BaseSection :title>
    <Grid id="projects-grid" :items="projects" class="md:grid-cols-2">
      <template v-slot="{ item: project }">
        <ColorfulCard :color-classes="project.color" class="flex flex-col overflow-hidden" :padding="false">
          <div
            class="relative flex h-68 w-full items-center justify-center overflow-hidden border-b border-stone-700 text-xs text-stone-500"
          >
            <img :src="`public/img/${project.image}`" :alt="project.title" class="object-cover" />
            <div :class="['absolute right-0 bottom-0 left-0 h-0.5 bg-linear-to-r', project.color]"></div>
          </div>
          <div class="flex flex-1 flex-col gap-2 p-5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium tracking-wider text-stone-400 uppercase">{{ project.type }}</span>
              <span
                v-if="project.status === 'Live'"
                class="rounded-full border border-green-700 bg-green-900 px-2 py-1 text-xs font-medium text-green-400"
              >
                Live
              </span>
              <span
                v-else
                class="rounded-full border border-yellow-700 bg-yellow-900 px-2 py-1 text-xs font-medium text-yellow-400"
              >
                WIP
              </span>
            </div>
            <p class="text-base font-semibold text-white">{{ project.title }}</p>
            <p class="text-sm leading-relaxed text-stone-400">{{ project.description }}</p>
            <div class="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-stone-700 pt-3">
              <div>
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="mx-1 inline-block rounded-full border border-stone-600 bg-stone-800 px-2 py-1 text-xs text-stone-400"
                >
                  {{ tech }}
                </span>
              </div>
              <a
                v-if="project.link"
                class="rounded-full border border-stone-600 px-2.5 py-1 text-sm whitespace-nowrap text-stone-400 no-underline hover:border-stone-400 hover:text-white"
                v-bind:href="project.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le site →
              </a>
            </div>
          </div>
        </ColorfulCard>
      </template>
    </Grid>
  </BaseSection>
</template>
