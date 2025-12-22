<script setup lang="ts">
import HeroSection from "./components/HeroSection/index.vue";
import AboutSection from "./components/AboutSection/index.vue";
import ReviewsSection from "./components/ReviewsSection/index.vue";
import TransformSection from "./components/TransformSection/index.vue";
import MenuOverlay from "./components/MenuOverlay/index.vue";
import ServicesSection from "./components/ServicesSection/index.vue";
import FooterSection from "./components/FooterSection/index.vue";
import TeamSection from "./components/TeamSection/index.vue";
import ConsultationSection from "./components/ConsultationSection/index.vue";
import { ref, watch } from "vue";

const isMenuOpen = ref(false);

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(
  () => isMenuOpen.value,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  }
);
</script>

<template>
  <div class="page">
    <HeroSection @open-menu="openMenu" />
    <AboutSection />
    <ReviewsSection />
    <MenuOverlay :open="isMenuOpen" @close="closeMenu" />
    <ServicesSection />
    <TransformSection />
    <TeamSection />
    <ConsultationSection />
    <FooterSection />
  </div>
</template>
