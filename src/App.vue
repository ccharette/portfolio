<script setup>
import {
  ContactSection,
  ExperienceTimelineSection,
  ExpertiseSection,
  HeroSection,
  SkillSection,
  WorkPhilosophySection,
} from '@/components/sections'
import { ScrollProgress, ThemeToggle } from '@/components/features'
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
    <ThemeToggle class="fixed top-5 right-5 z-201" />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <HeroSection />
        <ExpertiseSection />
        <SkillSection />
        <ExperienceTimelineSection />
        <WorkPhilosophySection />
        <ContactSection />
      </div>
    </div>
  </div>
</template>
