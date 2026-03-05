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
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const isMenuOpen = ref(false);
const isPreloaderVisible = ref(true);
const hasAppliedInitialPath = ref(false);

const sections = [
  "hero",
  "about",
  "services",
  "transform",
  "team",
  "consult",
] as const;

type SectionId = (typeof sections)[number];

const sectionPathById: Record<SectionId, string> = {
  hero: "/",
  about: "/about",
  services: "/services",
  transform: "/transform",
  team: "/team",
  consult: "/consult",
};

const sectionIdByPath = new Map<string, SectionId>(
  Object.entries(sectionPathById).map(([id, path]) => [path, id as SectionId]),
);

const normalizePath = (path: string) =>
  path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;

const getCurrentSectionId = (): SectionId => {
  const offset = 140;
  let currentId: SectionId = "hero";

  for (const id of sections) {
    const sectionEl = document.getElementById(id);
    if (!sectionEl) continue;

    const top = sectionEl.getBoundingClientRect().top;
    if (top - offset <= 0) {
      currentId = id;
    } else {
      break;
    }
  }

  return currentId;
};

const scrollToSection = (id: SectionId, behavior: ScrollBehavior) => {
  const sectionEl = document.getElementById(id);
  if (!sectionEl) return;
  sectionEl.scrollIntoView({ behavior, block: "start" });
};

const syncPathWithViewport = () => {
  if (typeof window === "undefined") return;

  const sectionPath = sectionPathById[getCurrentSectionId()];
  const currentPath = normalizePath(window.location.pathname);

  if (currentPath !== sectionPath) {
    history.replaceState(null, "", sectionPath);
  }
};

const handleInternalSectionLinkClick = (event: MouseEvent) => {
  if (typeof window === "undefined") return;
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target as Element | null;
  const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return;
  }

  const url = new URL(anchor.href, window.location.origin);
  if (url.origin !== window.location.origin) return;

  const targetPath = normalizePath(url.pathname);
  const sectionId = sectionIdByPath.get(targetPath);
  if (!sectionId) return;

  event.preventDefault();

  if (normalizePath(window.location.pathname) !== targetPath) {
    history.pushState(null, "", targetPath);
  }

  scrollToSection(sectionId, "smooth");
};

const handlePopState = () => {
  if (typeof window === "undefined") return;

  const sectionId = sectionIdByPath.get(normalizePath(window.location.pathname));
  if (!sectionId) return;
  scrollToSection(sectionId, "auto");
};

const applyInitialPath = async () => {
  if (typeof window === "undefined") return;
  if (isPreloaderVisible.value || hasAppliedInitialPath.value) return;

  hasAppliedInitialPath.value = true;

  const currentPath = normalizePath(window.location.pathname);
  const sectionId = sectionIdByPath.get(currentPath);

  await nextTick();

  if (!sectionId) {
    history.replaceState(null, "", "/");
    scrollToSection("hero", "auto");
    return;
  }

  if (sectionId !== "hero") {
    scrollToSection(sectionId, "auto");
  }

  syncPathWithViewport();
};

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handlePreloaderDone = () => {
  isPreloaderVisible.value = false;
};

onMounted(() => {
  if (typeof window === "undefined") return;

  window.addEventListener("scroll", syncPathWithViewport, { passive: true });
  window.addEventListener("resize", syncPathWithViewport);
  window.addEventListener("popstate", handlePopState);
  document.addEventListener("click", handleInternalSectionLinkClick);

  void applyInitialPath();
});

watch(
  [() => isMenuOpen.value, () => isPreloaderVisible.value],
  ([menuOpen, preloaderVisible]) => {
    document.body.style.overflow = menuOpen || preloaderVisible ? "hidden" : "";
  },
  { immediate: true }
);

watch(
  () => isPreloaderVisible.value,
  () => {
    void applyInitialPath();
  },
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", syncPathWithViewport);
    window.removeEventListener("resize", syncPathWithViewport);
    window.removeEventListener("popstate", handlePopState);
    document.removeEventListener("click", handleInternalSectionLinkClick);
  }
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
