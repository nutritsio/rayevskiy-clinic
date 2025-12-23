<script setup lang="ts">
import { ref } from "vue";
import { VueCompareImage } from "vue3-compare-image";

type Slide = {
  id: number;
  before: string;
  after: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: 1,
    before: "/assets/transform/before-0.png",
    after: "/assets/transform/after-0.png",
    alt: "Трансформація усмішки — кейс 1",
  },
  {
    id: 2,
    before: "/assets/transform/before-1.png",
    after: "/assets/transform/after-1.png",
    alt: "Трансформація усмішки — кейс 2",
  },
  {
    id: 3,
    before: "/assets/transform/before-2.png",
    after: "/assets/transform/after-2.png",
    alt: "Трансформація усмішки — кейс 3",
  },
];

const activeIndex = ref(0);
const total = slides.length;
const createSlideArray = (value: number) => slides.map(() => value);
const sliderPositions = ref<number[]>(createSlideArray(0.5));
const resetKeys = ref<number[]>(createSlideArray(0));

const normalizeOffset = (index: number) => {
  const diff = index - activeIndex.value;
  if (diff > total / 2) return diff - total;
  if (diff < -total / 2) return diff + total;
  return diff;
};

const isActive = (index: number) => normalizeOffset(index) === 0;

const slideStyle = (index: number) => ({
  "--pos": normalizeOffset(index),
});

const goTo = (nextIndex: number) => {
  const prev = activeIndex.value;
  const normalizedNext = (nextIndex + total) % total;
  const nextPositions = [...sliderPositions.value];
  const nextResetKeys = [...resetKeys.value];

  if (prev !== normalizedNext) {
    nextPositions[prev] = 0.5;
    nextResetKeys[prev] += 1;
  }

  nextPositions[normalizedNext] = 0.5;
  nextResetKeys[normalizedNext] += 1;

  sliderPositions.value = nextPositions;
  resetKeys.value = nextResetKeys;
  activeIndex.value = normalizedNext;
};

const updateSliderPosition = (index: number, position: number) => {
  if (index !== activeIndex.value) return;
  const next = [...sliderPositions.value];
  next[index] = Math.min(1, Math.max(0, position));
  sliderPositions.value = next;
};

const goPrev = () => goTo(activeIndex.value - 1);
const goNext = () => goTo(activeIndex.value + 1);

const handleMarkup = `
  <div class="transform__handle">
    <div class="transform__handle-ring"></div>
    <div class="transform__handle-core">
      <img
        class="transform__handle-img"
        src="/assets/transform/slider.png"
        alt=""
        aria-hidden="true"
      />
      <span class="visually-hidden">Пересунути повзунок</span>
    </div>
  </div>
`;
</script>

<template>
  <section class="transform" id="transform">
    <div class="container">
      <header class="transform__head">
        <div class="transform__title">
          <div class="transform__title-main">Трансформація</div>
          <div class="transform__title-accent">усмішки</div>
        </div>
      </header>
    </div>

    <div class="transform__stage">
      <button
        class="transform__nav transform__nav--prev"
        type="button"
        aria-label="Попередній слайд"
        @click="goPrev"
      >
        <span aria-hidden="true">←</span>
      </button>

      <div class="transform__slides">
        <article
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="transform__slide"
          :class="{
            'transform__slide--active': isActive(index),
            'transform__slide--left': normalizeOffset(index) === -1,
            'transform__slide--right': normalizeOffset(index) === 1,
          }"
          :style="slideStyle(index)"
        >
          <VueCompareImage
            :key="`vci-${slide.id}-${resetKeys[index]}`"
            :left-image="slide.before"
            :right-image="slide.after"
            left-image-alt="До трансформації"
            right-image-alt="Після трансформації"
            left-image-label="До"
            right-image-label="Після"
            :handle-size="130"
            :handle="handleMarkup"
            :slide-on-click="true"
            :slider-line-color="'rgba(255, 255, 255, 0.9)'"
            :slider-line-width="2"
            :slider-position-percentage="sliderPositions[index]"
            :on-slider-position-change="
              (pos) => updateSliderPosition(index, pos)
            "
          />
          <span class="visually-hidden">{{ slide.alt }}</span>
        </article>
      </div>

      <button
        class="transform__nav transform__nav--next"
        type="button"
        aria-label="Наступний слайд"
        @click="goNext"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.transform {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 120px 0 140px;
}

.transform__head {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
}

.transform__title {
  text-align: center;
  line-height: 1;
}

.transform__title-main {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 96px);
  font-weight: 300;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.transform__title-accent {
  font-family: var(--font-accent);
  font-size: 100px;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.04em;
  transform: translateY(-8px);
}

.transform__stage {
  position: relative;
  max-width: 1800px;
  margin: 0 auto;
  min-height: clamp(320px, 50vw, 760px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 64px;
}

.transform__slides {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transform__slide {
  --pos: 0;
  position: absolute;
  inset: 0;
  margin: auto;
  width: min(1180px, 88vw);
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  transform: translateX(calc(var(--pos) * 52%));
  opacity: 0.4;
  filter: grayscale(0.1) brightness(0.55);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.32);
  pointer-events: none;
  transition: transform 340ms ease, opacity 340ms ease, filter 340ms ease,
    box-shadow 340ms ease;
}

.transform__slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 40%,
    rgba(0, 0, 0, 0.45)
  );
  pointer-events: none;
  transition: opacity 320ms ease;
}

.transform__slide--active {
  width: min(1180px, 88vw);
  opacity: 1;
  filter: none;
  z-index: 3;
  pointer-events: auto; /* keep active slide interactive for future content */
  box-shadow: 0 26px 64px rgba(0, 0, 0, 0.5);
}

.transform__slide--active::after {
  opacity: 0;
}

.transform__slide--left,
.transform__slide--right {
  width: clamp(760px, 78vw, 980px);
  z-index: 2;
}

:global(.transform .vci--container) {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #0f0f10;
  box-sizing: border-box;
  position: relative;
  display: flex;
}

:global(.transform .vci--right-image),
:global(.transform .vci--left-image) {
  display: flex;
  position: absolute;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

:global(.transform .vci--slider) {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.transform .vci--left-label),
:global(.transform .vci--right-label) {
  top: 32px !important;
  padding: 10px 22px;
  font-size: 16px;
  letter-spacing: 0.01em;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(12, 12, 13, 0.35);
  backdrop-filter: blur(6px);
  transform: none !important;
  opacity: 1 !important;
  color: #f9f9f9 !important;
  text-align: justify !important;
  font-family: Unbounded !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 300 !important;
  line-height: 24px !important; /* 120% */
  letter-spacing: 0.1px !important;
}

:global(.transform .vci--left-label) {
  left: 32px !important;
}

:global(.transform .vci--right-label) {
  right: 32px !important;
}

:global(.transform .vci--slider-line) {
  box-shadow: none;
}

:global(.transform .vci--custom-handle) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:global(.transform .vci--default-handle) {
  display: none;
}

:global(.transform .vci--left-arrow),
:global(.transform .vci--right-arrow) {
  height: 0;
  width: 0;
}

:global(.transform .vci--left-label-container),
:global(.transform .vci--right-label-container) {
  position: absolute;
  height: 100%;
  width: 100%;
}

.transform__handle {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.transform__handle-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(12, 12, 13, 0.18);
}

.transform__handle-core {
  position: relative;
  width: 116px;
  height: 116px;
  border-radius: 50%;
  background: rgba(12, 12, 13, 0.82);
  border: 2px solid rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
}

.transform__handle-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

@media (max-width: 900px) {
  .transform__handle {
    width: 110px;
    height: 110px;
  }

  .transform__handle-ring {
    inset: 0;
  }

  .transform__handle-core {
    width: 90px;
    height: 90px;
  }

  .transform__handle-img {
    width: 46px;
    height: 46px;
  }
}

.transform__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(12, 12, 13, 0.7);
  color: #f7f7f7;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: transform 200ms ease, border-color 200ms ease, color 200ms ease,
    background 200ms ease;
}

.transform__nav:hover {
  transform: translateY(-50%) scale(1.05);
  border-color: #f7f7f7;
  color: #ffffff;
  background: rgba(12, 12, 13, 0.9);
}

.transform__nav:active {
  transform: translateY(-50%) scale(0.97);
}

.transform__nav--prev {
  left: 24px;
}

.transform__nav--next {
  right: 24px;
}

@media (max-width: 1200px) {
  .transform {
    padding: 96px 0 120px;
  }

  .transform__stage {
    padding: 0 40px;
    min-height: clamp(320px, 60vw, 620px);
  }

  .transform__slide {
    transform: translateX(calc(var(--pos) * 48%));
  }
}

@media (max-width: 900px) {
  .transform__stage {
    padding: 0 24px;
    min-height: clamp(320px, 68vw, 540px);
  }

  .transform__slide {
    transform: translateX(calc(var(--pos) * 20%));
    opacity: 0.55;
    filter: brightness(0.7);
  }

  .transform__slide--left,
  .transform__slide--right {
    width: 78vw;
    opacity: 0.3;
  }

  :global(.transform .vci--left-label),
  :global(.transform .vci--right-label) {
    top: 16px !important;
    padding: 8px 16px;
    font-size: 15px;
  }

  :global(.transform .vci--left-label) {
    left: 16px !important;
  }

  :global(.transform .vci--right-label) {
    right: 16px !important;
  }

  .transform__nav {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
}

@media (max-width: 640px) {
  .transform {
    padding: 72px 0 96px;
  }

  .transform__head {
    margin-bottom: 32px;
  }

  .transform__stage {
    padding: 0 16px;
    min-height: 420px;
  }

  .transform__slide {
    width: 100%;
    transform: translateX(calc(var(--pos) * 6%));
    opacity: 0.9;
    filter: none;
  }

  .transform__slide--left,
  .transform__slide--right {
    opacity: 0;
    pointer-events: none;
  }

  .transform__nav {
    width: 56px;
    height: 56px;
    font-size: 22px;
    background: rgba(12, 12, 13, 0.82);
  }

  .transform__nav--prev {
    left: 12px;
  }

  .transform__nav--next {
    right: 12px;
  }
}
</style>
