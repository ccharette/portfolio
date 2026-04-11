<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  end: {
    type: Number,
    required: true,
  },
  suffix: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 1.5,
  },
  delay: {
    type: Number,
    default: 0,
  },
})

const count = ref(0)
const counterRef = ref(null)

let ctx

const startAnimation = () => {
  if (ctx) ctx.revert()
  ctx = gsap.context(() => {
    gsap.to(count, {
      value: props.end,
      duration: props.duration,
      delay: props.delay,
      ease: 'power2.out',
      snap: { value: 1 },
      scrollTrigger: {
        trigger: counterRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, counterRef.value)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})

// Watch for changes if end value is dynamic (though here it's static in the React code)
watch(
  () => props.end,
  () => {
    count.value = 0
    startAnimation()
  },
)
</script>

<template>
  <span ref="counterRef"> {{ Math.round(count) }}{{ suffix }} </span>
</template>
