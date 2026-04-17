<script setup>
import {
  ContactSection,
  ExperienceTimelineSection,
  ExpertiseSection,
  HeroSection,
  ProjectSection,
  WorkPhilosophySection,
} from '@/components/sections'
import { ScrollProgress } from '@/components/features'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { onMounted } from 'vue'

onMounted(() => {
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  })
})
</script>

<template>
  <div>
    <ScrollProgress />
    <!--    <ThemeToggle class="fixed top-5 right-5 z-50" />-->
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <HeroSection />
        <ProjectSection />
        <ExpertiseSection />
        <WorkPhilosophySection />
        <ExperienceTimelineSection />
        <ContactSection />
      </div>
    </div>
  </div>
</template>
