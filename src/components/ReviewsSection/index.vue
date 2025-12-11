<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const slides = Array.from({ length: 4 }).map((_, idx) => ({
  id: idx + 1,
  name: t("reviews.author"),
  text: t("reviews.text"),
  avatar: "/assets/reviews/avatar.png",
  time: t("reviews.time"),
  stars: t("reviews.stars"),
}));
</script>

<template>
  <section class="reviews" id="reviews">
    <div class="container reviews__head">
      <div class="reviews__rating">
        <div class="reviews__rating-value">{{ t("reviews.rating") }}</div>
        <div class="reviews__rating-stars">{{ t("reviews.stars") }}</div>
      </div>
      <div class="reviews__meta">
        <div class="reviews__clinic">{{ t("reviews.clinic") }}</div>
        <div class="reviews__address">{{ t("reviews.address") }}</div>
      </div>
      <button class="reviews__cta" type="button">
        <span class="reviews__cta-icon">
          <img src="/assets/reviews/google.svg" alt="" />
        </span>
        <span class="reviews__cta-text">{{ t("reviews.leaveReview") }}</span>
      </button>
    </div>
    <div class="reviews__slider">
      <div class="reviews__track">
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
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 32px;
    margin-bottom: 48px;
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
    overflow-x: auto;
    scrollbar-width: none;
    scroll-padding-left: 64px;
    scroll-padding-right: 64px;
    margin-right: -64px;

    &::-webkit-scrollbar {
      display: none;
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

  @media (max-width: 1280px) {
    &__head {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 0 32px;
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
