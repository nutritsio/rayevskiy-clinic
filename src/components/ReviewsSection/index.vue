<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type Review = {
  id: number;
  name: string;
  text: string;
  avatar: string;
  time: string;
  stars: string;
};

const { t, tm } = useI18n();

const slides = computed(() => {
  const rawList = tm("reviews.list") as unknown;
  const list = Array.isArray(rawList)
    ? (rawList as Array<Record<string, string>>)
    : [];

  return list.map<Review>((item, idx) => ({
    id: idx + 1,
    name: item.name ?? (t("reviews.author") as string),
    text: item.text ?? (t("reviews.text") as string),
    avatar: item.avatar ?? "/assets/reviews/avatar.png",
    time: item.time ?? (t("reviews.time") as string),
    stars: item.stars ?? (t("reviews.stars") as string),
  }));
});

const trackRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
let dragStartX = 0;
let dragStartScrollLeft = 0;
let activePointerId: number | null = null;

const handleTrackPointerDown = (event: PointerEvent) => {
  const track = trackRef.value;
  if (!track) return;
  if (event.button !== 0) return;

  activePointerId = event.pointerId;
  isDragging.value = true;
  dragStartX = event.clientX;
  dragStartScrollLeft = track.scrollLeft;
  track.setPointerCapture(event.pointerId);
  event.preventDefault();
};

const handleTrackPointerMove = (event: PointerEvent) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return;
  const track = trackRef.value;
  if (!track) return;

  const delta = event.clientX - dragStartX;
  track.scrollLeft = dragStartScrollLeft - delta;
};

const stopDragging = () => {
  isDragging.value = false;
  activePointerId = null;
};

const handleTrackPointerUp = (event: PointerEvent) => {
  const track = trackRef.value;
  if (!track || event.pointerId !== activePointerId) return;

  if (track.hasPointerCapture(event.pointerId)) {
    track.releasePointerCapture(event.pointerId);
  }

  stopDragging();
};
</script>

<template>
  <section class="reviews" id="reviews">
    <div class="container reviews__head">
      <div class="reviews__info">
        <div class="reviews__rating">
          <div class="reviews__rating-value">{{ t("reviews.rating") }}</div>
          <div class="reviews__rating-stars">{{ t("reviews.stars") }}</div>
        </div>
        <div class="reviews__meta">
          <div class="reviews__clinic">{{ t("reviews.clinic") }}</div>
          <div class="reviews__address">{{ t("reviews.address") }}</div>
        </div>
      </div>
      <a
        class="reviews__cta"
        href="https://maps.app.goo.gl/JgE4UcntBuGbSLSdA"
        target="_blank"
        rel="noreferrer"
      >
        <span class="reviews__cta-icon">
          <img src="/assets/reviews/google.svg" alt="" />
        </span>
        <span class="reviews__cta-text">{{ t("reviews.leaveReview") }}</span>
      </a>
    </div>
    <div class="reviews__slider">
      <div
        ref="trackRef"
        class="reviews__track"
        :class="{ 'is-dragging': isDragging }"
        @pointerdown="handleTrackPointerDown"
        @pointermove="handleTrackPointerMove"
        @pointerup="handleTrackPointerUp"
        @pointercancel="stopDragging"
        @lostpointercapture="stopDragging"
      >
        <article v-for="slide in slides" :key="slide.id" class="reviews__card">
          <img class="reviews__avatar" :src="slide.avatar" alt="" />
          <div class="reviews__body">
            <h3 class="reviews__name">{{ slide.name }}</h3>
            <div class="reviews__row">
              <span class="reviews__stars">{{ slide.stars }}</span>
              <span class="reviews__time">{{ slide.time }}</span>
            </div>
            <p class="reviews__text">
              {{ slide.text }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.reviews {
  padding: 100px 0 140px;
  background: var(--color-bg);
  color: var(--color-text);

  &__head {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 48px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-display);
  }

  &__rating-value {
    font-size: 48px;
    font-weight: 300;
    line-height: 1;
  }

  &__rating-stars {
    font-size: 24px;
    color: #ff7527;
    letter-spacing: 2px;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__clinic {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 300;
    line-height: 1.1;
  }

  &__address {
    font-size: 18px;
    color: var(--color-text);
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 22px;
    border-radius: 28px;
    border: 2px solid #e6e6e6;
    background: transparent;
    color: #f2f2f2;
    font-size: 16px;
    font-weight: 500;
    font-family: var(--font-display);
    cursor: pointer;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    transition: color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
    align-self: flex-end;
    margin-left: auto;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -80%;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(249, 249, 249, 0.25) 50%,
        transparent 100%
      );
      transform: skewX(-20deg);
      transition: left 0.5s ease;
    }

    &:hover {
      color: #f9f9f9;
      border-color: #f9f9f9;
      transform: translateY(-1px);
    }

    &:hover::after {
      left: 120%;
    }
  }

  &__cta-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__cta-text {
    line-height: 1;
  }

  &__slider {
    overflow: hidden;
    padding: 0;
  }

  &__track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 24px;
    padding: 12px 64px;
    padding-bottom: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    scroll-padding-left: 64px;
    scroll-padding-right: 64px;
    margin-right: -64px;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &.is-dragging {
      cursor: grabbing;
    }
  }

  &__card {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 16px;
    padding: 22px 24px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    min-width: 735px;
    max-width: 735px;
    box-sizing: border-box;
  }

  &__card:last-child {
    margin-right: 24px;
  }

  &__avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__name {
    margin: 0;
    font-family: "Manrope", var(--font-body);
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__stars {
    color: #ff7527;
    font-size: 16px;
    letter-spacing: 2px;
  }

  &__time {
    font-size: 16px;
    color: var(--color-muted);
  }

  &__text {
    margin: 0;
    font-family: "Manrope", var(--font-body);
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: var(--color-text);
  }

  @media (min-width: 1025px) and (max-width: 1700px) {
    padding: 84px 0 112px;

    &__head {
      margin-bottom: 36px;
    }

    &__rating-value {
      font-size: 40px;
    }

    &__rating-stars {
      font-size: 20px;
    }

    &__clinic {
      font-size: 34px;
    }

    &__address {
      font-size: 16px;
    }

    &__cta {
      font-size: 14px;
      padding: 10px 18px;
    }

    &__track {
      gap: 18px;
      padding: 10px 24px;
      padding-bottom: 4px;
      scroll-padding-left: 24px;
      scroll-padding-right: 24px;
      margin-right: -24px;
    }

    &__card {
      min-width: 620px;
      max-width: 620px;
      padding: 18px 20px;
    }

    &__name,
    &__text {
      font-size: 16px;
      line-height: 1.35;
    }
  }

  @media (max-width: 1280px) {
    &__head {
      padding: 0 32px;
      flex-direction: column;
      align-items: flex-start;
    }

    &__cta {
      margin-left: 0;
      align-self: flex-start;
    }

    &__slider {
      padding: 0 32px;
    }

    &__track {
      grid-auto-columns: 90%;
    }

    &__card {
      min-width: 90%;
      max-width: 90%;
    }
  }
}
</style>
