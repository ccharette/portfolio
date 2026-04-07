<script setup>
import { onMounted, ref, watch } from 'vue'
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

const startAnimation = () => {
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
}

onMounted(() => {
  startAnimation()
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
