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
import LocationSection from "./components/LocationSection/index.vue";
import SplashPreloader from "./components/SplashPreloader/index.vue";
import { onBeforeUnmount, ref, watch } from "vue";

const isMenuOpen = ref(false);
const isPreloaderVisible = ref(true);

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handlePreloaderDone = () => {
  isPreloaderVisible.value = false;
};

watch(
  [() => isMenuOpen.value, () => isPreloaderVisible.value],
  ([menuOpen, preloaderVisible]) => {
    document.body.style.overflow = menuOpen || preloaderVisible ? "hidden" : "";
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <SplashPreloader v-if="isPreloaderVisible" @done="handlePreloaderDone" />

  <div class="page">
    <HeroSection @open-menu="openMenu" />
    <AboutSection />
    <ReviewsSection />
    <MenuOverlay :open="isMenuOpen" @close="closeMenu" />
    <ServicesSection />
    <TransformSection />
    <TeamSection />
    <LocationSection />
    <ConsultationSection />
    <FooterSection />
  </div>
</template>
