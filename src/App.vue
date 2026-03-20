<script setup>
import { HeaderNav, SideBar } from '@/layouts'
import { HeroSection, SkillsSection } from '@/components/sections'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

ScrollSmoother.create({
  smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
})
</script>

<template>
  <div class="bg-stone-200 dark:bg-stone-900">
    <header>
      <HeaderNav />
    </header>
    <main>
      <Teleport to="#ui-layer">
        <SideBar />
      </Teleport>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <div id="about">
            <SkillsSection />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
