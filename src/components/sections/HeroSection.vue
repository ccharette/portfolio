<script setup>
import { BaseTypewriter } from '@/components/ui/index.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref, watch } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const heroContainer = ref(null)
const mousePosition = ref({ x: 0, y: 0 })

const floatingIcons = ref([])
const icons = [
  {
    class: 'fa-solid fa-leaf',
    x: '10%',
    y: '15%',
    color: 'text-emerald-400/20 dark:text-emerald-600/30',
    label: 'Plant lover',
  },
  {
    class: 'fa-solid fa-paw',
    x: '80%',
    y: '20%',
    color: 'text-rose-400/20 dark:text-rose-600/30',
    label: 'Cat lover',
  },
  {
    class: 'fa-solid fa-code',
    x: '15%',
    y: '70%',
    color: 'text-purple-400/20 dark:text-purple-600/30',
    label: 'Developer',
  },
  {
    class: 'fa-solid fa-gamepad',
    x: '85%',
    y: '78%',
    color: 'text-cyan-400/20 dark:text-cyan-600/30',
    label: 'Geek',
  },
]

const hoveredIcon = ref(null)
const tooltipRef = ref(null)

const handleMouseMove = (e) => {
  const x = e.clientX
  const y = e.clientY

  mousePosition.value = {
    x: (x / window.innerWidth - 0.5) * 20,
    y: (y / window.innerHeight - 0.5) * 20,
  }

  // Update tooltip position if visible
  if (tooltipRef.value) {
    gsap.set(tooltipRef.value, {
      x: x + 20,
      y: y + 20,
    })
  }
}

const handleIconEnter = (index) => {
  hoveredIcon.value = icons[index]

  gsap.to(floatingIcons.value[index], {
    scale: 1.25,
    duration: 0.3,
    ease: 'back.out(1.7)',
    overwrite: 'auto',
  })

  gsap.fromTo(
    tooltipRef.value,
    { opacity: 0, scale: 0.8, display: 'block' },
    {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
    },
  )
}

const handleIconLeave = (index) => {
  hoveredIcon.value = null

  gsap.to(floatingIcons.value[index], {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to(tooltipRef.value, {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      if (!hoveredIcon.value) {
        gsap.set(tooltipRef.value, { display: 'none' })
      }
    },
  })
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)

  // Floating icons animations
  floatingIcons.value.forEach((icon, index) => {
    if (!icon) return
    const span = icon.querySelector('span')
    if (!span) return
    gsap.to(span, {
      y: index % 2 === 0 ? -20 : 20,
      rotate: index % 2 === 0 ? 5 : -5,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2,
    })
  })

  // Smooth mouse parallax
  const updateParallax = () => {
    floatingIcons.value.forEach((icon, index) => {
      if (!icon) return
      const multiplier = index === 1 ? -1 : index === 2 ? 0.5 : 1
      const x = mousePosition.value.x * multiplier
      const y = mousePosition.value.y * multiplier
      gsap.to(icon, {
        x,
        y,
        duration: 1.2,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    })
  }

  // Watch for mouse position changes and update parallax smoothly
  const stopWatch = watch(mousePosition, updateParallax)

  // Scroll animation to fade out/in the hero section
  gsap.to(heroContainer.value, {
    scrollTrigger: {
      trigger: heroContainer.value,
      start: 'top top',
      end: '+=50%', // Fade out completely within 50% of the viewport height
      scrub: true,
      pin: true,
      pinSpacing: false, // Allow following content to overlap or follow tightly
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onEnter: () => {
        gsap.set(heroContainer.value, { visibility: 'visible', pointerEvents: 'auto' })
      },
      onLeave: () => {
        gsap.set(heroContainer.value, { visibility: 'hidden', pointerEvents: 'none' })
      },
      onEnterBack: () => {
        gsap.set(heroContainer.value, { visibility: 'visible', pointerEvents: 'auto' })
      },
      onLeaveBack: () => {
        gsap.set(heroContainer.value, { visibility: 'visible', pointerEvents: 'auto' })
      },
    },
    opacity: 0,
    scale: 0.9,
    y: -50,
    ease: 'power2.inOut',
  })

  onUnmounted(() => {
    stopWatch()
    window.removeEventListener('mousemove', handleMouseMove)
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === heroContainer.value) st.kill()
    })
  })
})
</script>

<template>
  <section
    ref="heroContainer"
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-emerald-50 transition-colors duration-500 dark:from-stone-900 dark:via-purple-950/30 dark:to-emerald-950/20"
  >
    <!-- Floating icons with easter eggs -->
    <div
      v-for="(icon, index) in icons"
      :key="index"
      :ref="(el) => (floatingIcons[index] = el)"
      :class="icon.color"
      :style="{
        left: icon.x,
        top: icon.y,
      }"
      class="absolute z-10 cursor-pointer"
      @mouseenter="handleIconEnter(index)"
      @mouseleave="handleIconLeave(index)"
    >
      <span :class="[icon.class, 'inline-block text-6xl xl:text-6xl']" />
    </div>

    <!-- Tooltip -->
    <div
      ref="tooltipRef"
      class="pointer-events-none fixed top-0 left-0 z-50 hidden rounded-lg bg-white/80 px-3 py-1.5 text-sm font-medium text-stone-800 opacity-0 shadow-lg backdrop-blur-md dark:bg-stone-800/80 dark:text-stone-200"
    >
      {{ hoveredIcon?.label }}
    </div>

    <!-- Main content -->
    <div class="relative z-10 max-w-5xl px-6 text-center">
      <div class="space-y-8">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-sm text-emerald-700 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-emerald-300 dark:backdrop-blur-xl"
        >
          <i class="fa-solid fa-wand-magic-sparkles h-4 w-4"></i>
          <span>Full Stack Developer depuis 2018</span>
        </div>

        <!-- Title -->
        <div class="space-y-4">
          <h1 class="text-6xl font-bold tracking-tight md:text-8xl">
            <span
              class="bg-gradient-to-r from-purple-900 via-pink-700 to-emerald-700 bg-clip-text text-transparent dark:from-white dark:via-purple-200 dark:to-emerald-200"
            >
              Catherine Charette
            </span>
          </h1>

          <p class="text-2xl font-light text-stone-700 md:text-4xl dark:text-stone-300">
            <BaseTypewriter :delay="80" text="Développeuse Full Stack Sénior" />
          </p>
        </div>

        <!-- Description -->
        <p
          class="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-400"
        >
          Spécialiste de la
          <span class="font-medium text-purple-700 dark:text-purple-300">
            logique d'application
          </span>
          et de l'
          <span class="font-medium text-emerald-700 dark:text-emerald-300">
            architecture technique
          </span>
          . Maîtrise exceptionnelle de Laravel & Vue.js.
        </p>

        <!-- Tech stack pills -->
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="tech in ['Laravel', 'Vue.js', 'Tailwind', 'Architecture', 'Leadership']"
            :key="tech"
            class="cursor-default rounded-full border border-gray-200 bg-white/80 px-5 py-2.5 text-sm text-stone-700 shadow-sm transition-all hover:-translate-y-1 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:backdrop-blur-xl dark:hover:bg-white/10"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- Grid overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] bg-[size:100px_100px] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]"
    />
  </section>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
