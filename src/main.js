import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const app = createApp(App)

app.mount('#app')
