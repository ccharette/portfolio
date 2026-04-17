<script setup>
import { BaseCard, BaseSection, ColorfulCard, Grid } from '@/components/ui'
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref(null)
const quoteRef = ref(null)

const title = 'Comment je travaille'

const philosophies = [
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Rigueur & Précision',
    description: 'Validations systématiques, conventions strictes, zéro dette cachée.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: 'fa-solid fa-sitemap',
    title: 'Architecture solide',
    description: 'Je pense front-back ensemble. Structures claires, évolutives dès le départ.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Performance durable',
    description: 'Requêtes optimisées, chargement limité, code pensé pour durer.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'IA pragmatique',
    description: "J'utilise les outils IA pour accélérer, jamais pour remplacer la compréhension.",
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Maintenabilité',
    description: "Code lisible, scalable par défaut. Un autre dev peut reprendre sans s'arracher les cheveux.",
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: 'fa-solid fa-user-check',
    title: 'Vision utilisateur',
    description: 'Je challenge les choix UX pour proposer des solutions simples qui fonctionnent vraiment.',
    color: 'from-rose-500 to-pink-500',
  },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(quoteRef.value.$el, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: quoteRef.value.$el,
        start: 'top 90%',
      },
    })
  }, sectionRef.value.$el)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <BaseSection ref="sectionRef" :description :title dark>
    <Grid id="workPhilisophyGrid" :items="philosophies" class="md:grid-cols-2 lg:grid-cols-3">
      <template v-slot="{ item }">
        <ColorfulCard :color-classes="item.color" class="group">
          <!-- Icon -->
          <div
            :class="[
              'mb-6 h-16 w-16 rounded-xl bg-gradient-to-br p-0.5 shadow-lg transition-transform duration-500 group-hover:scale-110',
              item.color,
            ]"
          >
            <div class="flex h-full w-full items-center justify-center rounded-xl bg-stone-900">
              <i :class="[item.icon, 'text-2xl text-white']"></i>
            </div>
          </div>

          <!-- Title -->
          <h3 class="mb-3 text-xl font-bold text-white">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="mb-4 text-sm leading-relaxed text-stone-400">
            {{ item.description }}
          </p>

          <!-- Stats badge -->
          <!--        <div-->
          <!--          :class="[-->
          <!--            'mt-auto inline-flex w-fit items-center rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-semibold text-white',-->
          <!--            item.color,-->
          <!--          ]"-->
          <!--        >-->
          <!--          {{ item.stats }}-->
          <!--        </div>-->

          <!-- Decorative corner -->
          <div
            :class="[
              'absolute top-0 right-0 h-20 w-20 rounded-tr-2xl rounded-bl-full opacity-10',
              item.color,
              'bg-gradient-to-br',
            ]"
          ></div>
        </ColorfulCard>
      </template>
    </Grid>

    <!-- Quote section -->
    <BaseCard
      ref="quoteRef"
      class="mx-auto mt-20 max-w-4xl bg-gradient-to-br from-purple-500/10 to-emerald-500/10 p-10 backdrop-blur-xl md:p-12"
    >
      <div class="absolute top-6 left-6 font-serif text-6xl text-purple-500/20">"</div>
      <p class="relative z-10 text-center text-xl font-light text-stone-200 italic md:text-2xl">
        Je ne suis pas la développeuse qui va créer des animations époustouflantes. Je suis celle qui va construire la
        logique solide qui fait tourner votre application sans faille.
      </p>
      <div class="absolute right-6 bottom-6 rotate-180 font-serif text-6xl text-emerald-500/20">"</div>
    </BaseCard>
  </BaseSection>
</template>

<style scoped></style>
