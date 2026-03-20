<script setup>
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { onMounted } from 'vue'

gsap.registerPlugin(SplitText)

onMounted(() => {
  let split, animation

  split && split.revert()
  animation && animation.revert()

  split = SplitText.create('.text', { type: 'chars,words,lines' })

  animation && animation.revert()

  animation = gsap.from(split.lines, {
    rotationX: -50,
    transformOrigin: '10% 10% -50px',
    opacity: 0,
    duration: 0.8,
    ease: 'power2',
    stagger: 0.25,
    height: '25px',
  })
})
</script>

<template>
  <div class="flex min-h-250 w-full items-center">
    <div class="text mx-auto grid w-fit grid-rows-3 gap-3 font-bold uppercase">
      <div class="flex items-end justify-end space-x-6">
        <span class="text-pastel-pink-300 dark:text-pastel-pink-100 text-2xl">Je suis</span>
        <hr
          class="dark:border-b-pastel-pink-400 border-b-pastel-pink-600 mb-1 grow border-t-0 border-b-4"
        />
      </div>
      <h1 class="text-pastel-pink-300 dark:text-pastel-pink-100 text-8xl">Catherine Charette</h1>
      <div class="text-right">
        <span class="text-pastel-pink-600 dark:text-pastel-pink-400 text-2xl">
          une developpeuse <br />
          Fullstack
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
