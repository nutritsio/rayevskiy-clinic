<script setup lang="ts">
import { ref } from "vue";

type Slide = {
  id: number;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/assets/transform/smile.png",
    alt: "Трансформація усмішки — приклад 1",
  },
  {
    id: 2,
    image: "/assets/transform/smile.png",
    alt: "Трансформація усмішки — приклад 2",
  },
  {
    id: 3,
    image: "/assets/transform/smile.png",
    alt: "Трансформація усмішки — приклад 3",
  },
];

const activeIndex = ref(0);
const total = slides.length;

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
  activeIndex.value = (nextIndex + total) % total;
};

const goPrev = () => goTo(activeIndex.value - 1);
const goNext = () => goTo(activeIndex.value + 1);
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
          <img
            class="transform__image"
            :src="slide.image"
            :alt="slide.alt"
            loading="lazy"
          />
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
  font-size: clamp(56px, 8vw, 144px);
  font-weight: 500;
  font-style: italic;
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
  --scale: 0.82;
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
  transform: translateX(calc(var(--pos) * 52%)) scale(var(--scale));
  opacity: 0.4;
  filter: grayscale(0.1) brightness(0.55);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.32);
  pointer-events: none;
  transition:
    transform 340ms ease,
    opacity 340ms ease,
    filter 340ms ease,
    box-shadow 340ms ease;
}

.transform__slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.45));
  pointer-events: none;
  transition: opacity 320ms ease;
}

.transform__slide--active {
  --scale: 1;
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
  z-index: 2;
}

.transform__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
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
    transform: translateX(calc(var(--pos) * 48%)) scale(var(--scale));
  }
}

@media (max-width: 900px) {
  .transform__stage {
    padding: 0 24px;
    min-height: clamp(320px, 68vw, 540px);
  }

  .transform__slide {
    --scale: 0.9;
    transform: translateX(calc(var(--pos) * 20%)) scale(var(--scale));
    opacity: 0.55;
    filter: brightness(0.7);
  }

  .transform__slide--left,
  .transform__slide--right {
    opacity: 0.3;
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
    --scale: 1;
    transform: translateX(calc(var(--pos) * 6%)) scale(var(--scale));
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
