<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const headerRef = ref(null)
const mainCardRef = ref(null)
const socialLinksRefs = ref([])
const cvButtonRef = ref(null)
const interestsRef = ref(null)
const interestItemsRefs = ref([])
const footerRef = ref(null)
const particlesRefs = ref([])
const bgCircle = ref(null)

const hoveredIcon = ref(null)

const socialLinks = [
  {
    id: 'email',
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    href: 'mailto:votre.email@example.com',
    color: 'from-rose-500 to-pink-500',
    description: 'votre.email@example.com',
  },
  {
    id: 'linkedin',
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/votreprofil',
    color: 'from-blue-500 to-cyan-500',
    description: '/in/votreprofil',
  },
  {
    id: 'github',
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    href: 'https://github.com/votreprofil',
    color: 'from-purple-500 to-violet-500',
    description: '@votreprofil',
  },
]

const interests = [
  { icon: 'fa-solid fa-leaf', label: 'Plantes', color: 'text-emerald-400' },
  { icon: 'fa-solid fa-cat', label: 'Chats', color: 'text-rose-400' },
  { icon: 'fa-solid fa-gamepad', label: 'Geek', color: 'text-purple-400' },
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Background glow animation
    gsap.to(bgCircle.value, {
      scale: 1.3,
      opacity: 0.2,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // Particles animation
    particlesRefs.value.forEach((particle) => {
      gsap.to(particle, {
        y: -30,
        opacity: 0.8,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
        ease: 'power1.inOut',
      })
    })

    // Scroll animations
    gsap.from(headerRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 85%',
      },
    })

    gsap.from(mainCardRef.value, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: mainCardRef.value,
        start: 'top 80%',
      },
    })

    gsap.from(socialLinksRefs.value, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: mainCardRef.value,
        start: 'top 75%',
      },
    })

    gsap.from(cvButtonRef.value, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: cvButtonRef.value,
        start: 'top 90%',
      },
    })

    gsap.from(interestsRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: interestsRef.value,
        start: 'top 90%',
      },
    })

    gsap.from(interestItemsRefs.value, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: interestsRef.value,
        start: 'top 90%',
      },
    })

    gsap.from(footerRef.value, {
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 95%',
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

const handleHoverStart = (id) => {
  hoveredIcon.value = id
}

const handleHoverEnd = () => {
  hoveredIcon.value = null
}
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-gradient-to-b from-stone-950 to-black px-6 py-32"
  >
    <!-- Background effects -->
    <div class="pointer-events-none absolute inset-0">
      <div
        ref="bgCircle"
        class="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-emerald-500/20 opacity-10 blur-3xl"
      ></div>
    </div>

    <div class="relative mx-auto max-w-5xl">
      <div ref="headerRef" class="mb-16 text-center">
        <h2
          class="mb-6 bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
        >
          Travaillons Ensemble
        </h2>
        <p class="mx-auto max-w-2xl text-xl text-stone-400">
          Vous cherchez une développeuse full stack sénior qui maîtrise Laravel et Vue.js ? Parlons
          de votre projet.
        </p>
      </div>

      <!-- Main contact card -->
      <div ref="mainCardRef" class="mb-12">
        <div
          class="relative rounded-3xl border border-stone-700/50 bg-gradient-to-br from-stone-900/80 to-stone-800/80 p-8 backdrop-blur-xl md:p-12"
        >
          <div class="grid gap-8 md:grid-cols-3">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              ref="socialLinksRefs"
              :href="link.href"
              :rel="link.id !== 'email' ? 'noopener noreferrer' : undefined"
              :target="link.id !== 'email' ? '_blank' : undefined"
              class="group relative h-full transition-transform duration-300 hover:-translate-y-2"
              @mouseenter="handleHoverStart(link.id)"
              @mouseleave="handleHoverEnd"
            >
              <div
                :class="[
                  'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20',
                  link.color,
                ]"
              ></div>

              <div
                class="relative flex h-full flex-col items-center rounded-2xl border border-stone-700/50 bg-stone-800/50 p-6 text-center transition-all duration-300 group-hover:border-stone-600/50"
              >
                <div
                  :class="[
                    'mb-4 h-16 w-16 rounded-full bg-gradient-to-br p-0.5 shadow-lg transition-transform duration-500',
                    link.color,
                    { 'scale-110 rotate-[360deg]': hoveredIcon === link.id },
                  ]"
                >
                  <div
                    class="flex h-full w-full items-center justify-center rounded-full bg-stone-900"
                  >
                    <i :class="[link.icon, 'text-2xl text-white']"></i>
                  </div>
                </div>

                <h3 class="mb-2 text-xl font-bold text-white">
                  {{ link.label }}
                </h3>
                <p class="text-sm text-stone-400">
                  {{ link.description }}
                </p>
              </div>
            </a>
          </div>

          <!-- Download CV button -->
          <div ref="cvButtonRef" class="mt-8 text-center">
            <button
              class="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <i class="fa-solid fa-download group-hover:animate-bounce"></i>
              <span>Télécharger mon CV</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Interests section -->
      <div ref="interestsRef" class="mb-12 text-center">
        <p class="mb-6 text-sm text-stone-500">Au-delà du code</p>
        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="interest in interests"
            :key="interest.label"
            ref="interestItemsRefs"
            class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl transition-transform duration-300 hover:scale-120 hover:rotate-5"
          >
            <i :class="[interest.icon, interest.color, 'text-lg']"></i>
            <span class="text-stone-300">{{ interest.label }}</span>
          </div>
        </div>
      </div>

      <!-- Footer text -->
      <div ref="footerRef" class="space-y-4 border-t border-stone-800 pt-12 text-center">
        <p class="text-sm text-stone-500">
          Développé avec <span class="text-rose-400">♥</span> logique et précision
        </p>
        <p class="text-xs text-stone-600">© 2026 - Votre Nom - Full Stack Developer</p>
      </div>
    </div>

    <!-- Floating particles -->
    <div
      v-for="i in 10"
      :key="i"
      ref="particlesRefs"
      :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }"
      class="absolute h-1 w-1 rounded-full bg-white/20"
    ></div>
  </section>
</template>

<style scoped></style>
