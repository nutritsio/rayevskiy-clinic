<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import MenuOverlay from './components/MenuOverlay.vue'
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(
  () => isMenuOpen.value,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)
</script>

<template>
  <div class="page">
    <HeroSection @open-menu="openMenu" />
    <AboutSection />
    <ReviewsSection />
    <MenuOverlay :open="isMenuOpen" @close="closeMenu" />
  </div>
</template>
