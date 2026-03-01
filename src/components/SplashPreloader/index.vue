<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const emit = defineEmits<{
  (e: "done"): void;
}>();

const GROW_DURATION_MS = 1500;
const HOLD_DURATION_MS = 1200;
const FADE_DURATION_MS = 450;

const isVisible = ref(true);
const isLeaving = ref(false);
const isReducedMotion = ref(false);

let leaveTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const clearTimers = () => {
  if (leaveTimer) {
    clearTimeout(leaveTimer);
    leaveTimer = null;
  }

  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

watch(isVisible, (visible) => {
  if (!visible) {
    emit("done");
  }
});

onMounted(() => {
  if (typeof window !== "undefined") {
    isReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  const growDuration = isReducedMotion.value ? 300 : GROW_DURATION_MS;
  const holdDuration = isReducedMotion.value ? 200 : HOLD_DURATION_MS;
  const fadeDuration = isReducedMotion.value ? 250 : FADE_DURATION_MS;

  leaveTimer = setTimeout(() => {
    isLeaving.value = true;
  }, growDuration + holdDuration);

  hideTimer = setTimeout(() => {
    isVisible.value = false;
  }, growDuration + holdDuration + fadeDuration);
});

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <div
    v-if="isVisible"
    class="preloader"
    :class="{ 'preloader--leaving': isLeaving, 'preloader--reduced-motion': isReducedMotion }"
    aria-hidden="true"
  >
    <div class="preloader__lockup">
      <img class="preloader__logo" src="/assets/logo.svg" alt="" loading="eager" decoding="async" />
      <div class="preloader__wordmark-frame">
        <img class="preloader__wordmark" src="/assets/hero/brand.svg" alt="" loading="eager" decoding="async" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preloader {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: var(--color-bg);
  opacity: 1;
  visibility: visible;
  pointer-events: all;
  transition: opacity 0.45s ease, visibility 0.45s ease;

  &--leaving {
    opacity: 0;
    visibility: hidden;
  }

  &__lockup {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    transform-origin: center;
    animation: preloader-grow 1.5s ease-in-out both;
    will-change: transform;
  }

  &__logo {
    width: auto;
    height: 100px;
    flex: 0 0 auto;
  }

  &__wordmark-frame {
    width: 260px;
    height: 100px;
    overflow: hidden;
    flex: 0 0 auto;
  }

  &__wordmark {
    width: auto;
    height: 100px;
    display: block;
    transform: translateX(-115px);
  }

  &--reduced-motion &__lockup {
    animation-duration: 0.3s;
  }

  @media (max-width: 1024px) {
    &__lockup {
      gap: 14px;
    }

    &__logo {
      height: 72px;
    }

    &__wordmark-frame {
      width: 188px;
      height: 72px;
    }

    &__wordmark {
      height: 72px;
      transform: translateX(-83px);
    }
  }

  @media (max-width: 768px) {
    &__lockup {
      gap: 10px;
    }

    &__logo {
      height: 54px;
    }

    &__wordmark-frame {
      width: 140px;
      height: 54px;
    }

    &__wordmark {
      height: 54px;
      transform: translateX(-62px);
    }
  }
}

@keyframes preloader-grow {
  from {
    transform: scale(0.52);
  }

  78% {
    transform: scale(1.04);
  }

  to {
    transform: scale(1);
  }
}
</style>
