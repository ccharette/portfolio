<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  delay: {
    type: Number,
    default: 80,
  },
})

const displayText = ref('')

onMounted(() => {
  let i = 0
  const timer = setInterval(() => {
    if (i < props.text.length) {
      displayText.value += props.text.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, props.delay)
})
</script>

<template>
  <span>{{ displayText }}</span>
</template>
