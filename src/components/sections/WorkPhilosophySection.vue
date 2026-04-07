<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef = ref(null)
const cardsRef = ref([])
const quoteRef = ref(null)
const bgCircle1 = ref(null)
const bgCircle2 = ref(null)

const philosophies = [
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Minutieuse & Rigoureuse',
    description:
      'Attention méticuleuse aux détails. Chaque ligne de code est pensée, testée et optimisée pour garantir une qualité irréprochable.',
    color: 'from-emerald-500 to-teal-500',
    stats: 'Code review systématique',
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Optimisation Continue',
    description:
      'Constamment en quête de la meilleure solution. Je ne me contente jamais du "ça fonctionne" - je cherche le "ça fonctionne parfaitement".',
    color: 'from-purple-500 to-pink-500',
    stats: 'Refactoring proactif',
  },
  {
    icon: 'fa-solid fa-bullseye',
    title: 'Transparence & Pragmatisme',
    description:
      "Honnête sur mes forces et limites. Je livre ce que je maîtrise exceptionnellement bien plutôt que de promettre l'impossible.",
    color: 'from-rose-500 to-pink-500',
    stats: 'Communication claire',
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Architecture Réfléchie',
    description:
      "Spécialisée dans la logique d'application. Je construis des architectures qui ont du sens et qui évoluent facilement.",
    color: 'from-amber-500 to-orange-500',
    stats: 'Scalabilité prioritaire',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'UX avant UI',
    description:
      "Mon expertise est dans l'expérience utilisateur et la fluidité fonctionnelle. Les animations complexes ne sont pas ma spécialité - et je l'assume.",
    color: 'from-blue-500 to-cyan-500',
    stats: "Logique d'abord",
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Code Maintenable',
    description:
      'Je pense toujours au développeur qui reprendra mon code. Documentation claire, conventions respectées, architecture évidente.',
    color: 'from-violet-500 to-purple-500',
    stats: 'Legacy-proof',
  },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Background animations
    gsap.to(bgCircle1.value, {
      scale: 1.2,
      opacity: 0.1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
    gsap.to(bgCircle2.value, {
      scale: 1.2,
      opacity: 0.1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2,
    })

    // Content animations
    gsap.from(headerRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 85%',
      },
    })

    gsap.from(cardsRef.value, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.value.querySelector('.grid'),
        start: 'top 80%',
      },
    })

    gsap.from(quoteRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: quoteRef.value,
        start: 'top 90%',
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-stone-900 px-6 py-32">
    <!-- Animated background -->
    <div class="pointer-events-none absolute inset-0">
      <div
        ref="bgCircle1"
        class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-purple-500 opacity-5 blur-3xl"
      ></div>
      <div
        ref="bgCircle2"
        class="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-emerald-500 opacity-5 blur-3xl"
      ></div>
    </div>

    <div class="relative mx-auto max-w-7xl">
      <div ref="headerRef" class="mb-20 text-center">
        <h2
          class="mb-4 bg-gradient-to-r from-white to-stone-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
        >
          Philosophie de Travail
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-stone-400">
          Ce qui définit mon approche du développement et fait ma valeur en tant que développeuse
          sénior
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in philosophies"
          :key="item.title"
          ref="cardsRef"
          class="group relative h-full"
        >
          <!-- Glow effect on hover -->
          <div
            :class="[
              'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20',
              item.color,
            ]"
          ></div>

          <div
            class="relative h-full rounded-2xl border border-stone-700/50 bg-stone-800/50 p-8 backdrop-blur-xl transition-colors hover:border-stone-600/50"
          >
            <!-- Icon -->
            <div
              :class="[
                'mb-6 h-16 w-16 rounded-xl bg-gradient-to-br p-0.5 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]',
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
            <div
              :class="[
                'inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-semibold text-white',
                item.color,
              ]"
            >
              {{ item.stats }}
            </div>

            <!-- Decorative corner -->
            <div
              :class="[
                'absolute top-0 right-0 h-20 w-20 rounded-bl-full opacity-10',
                item.color,
                'bg-gradient-to-br',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Quote section -->
      <div ref="quoteRef" class="mx-auto mt-20 max-w-4xl">
        <div
          class="relative rounded-2xl border border-stone-700/50 bg-gradient-to-br from-purple-500/10 to-emerald-500/10 p-10 backdrop-blur-xl md:p-12"
        >
          <div class="absolute top-6 left-6 font-serif text-6xl text-purple-500/20">"</div>
          <p class="relative z-10 text-center text-xl font-light text-stone-200 italic md:text-2xl">
            Je ne suis pas la développeuse qui va créer des animations époustouflantes. Je suis
            celle qui va construire la logique solide qui fait tourner votre application sans
            faille.
          </p>
          <div class="absolute right-6 bottom-6 rotate-180 font-serif text-6xl text-emerald-500/20">
            "
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
