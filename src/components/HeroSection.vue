<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const languages = [
  { code: "ua", label: t("hero.langUa") },
  { code: "en", label: t("hero.langEn") },
];

const setLocale = (code: string) => {
  locale.value = code;
};
</script>

<template>
  <section class="hero">
    <div class="hero__background" aria-hidden="true">
      <div class="hero__image hero__image--desktop" />
      <div class="hero__image hero__image--mobile" />
      <div class="hero__overlay" />
    </div>

    <div class="hero__content">
      <header class="hero__topbar">
        <div class="hero__brand">
          <img
            class="hero__brand-image"
            src="/assets/hero/brand.svg"
            alt="Raievskiy logo"
            loading="lazy"
          />
        </div>
        <div class="hero__contact">
          <div class="hero__meta">
            <p class="hero__meta-title">
              {{ t("hero.address") }}
            </p>
          </div>
          <div class="hero__meta">
            <p class="hero__meta-title">
              {{ t("hero.hours") }}
            </p>
          </div>
        </div>
        <div class="hero__actions">
          <div class="hero__social">
            <a class="hero__social-button" href="#" aria-label="Facebook">
              <img src="/assets/header/item-1-209.svg" alt="" />
            </a>
            <a class="hero__social-button" href="#" aria-label="Instagram">
              <img src="/assets/header/item-1-210.svg" alt="" />
            </a>
          </div>
          <div class="hero__lang">
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="hero__lang-button"
              :class="{ 'hero__lang-button--active': locale === lang.code }"
              type="button"
              @click="setLocale(lang.code)"
            >
              {{ lang.label }}
            </button>
          </div>
          <button class="hero__menu" type="button" aria-label="Menu">
            <img src="/assets/header/item-1-216.svg" alt="" />
          </button>
        </div>
      </header>

      <div class="hero__headline">
        <div class="hero__title">
          <div class="hero__title-line hero__title-line--primary">
            {{ t("hero.headlinePrimary") }}
          </div>
          <div class="hero__title-line hero__title-line--primary">
            {{ t("hero.headlineSecondary") }}
          </div>
        </div>
      </div>

      <div class="hero__counter">
        <div class="hero__counter-value">{{ t("hero.counter") }}</div>
        <div class="hero__counter-label">
          {{ t("hero.counterLabel") }}
        </div>
      </div>

      <p class="hero__description" v-html="t('hero.subtext')" />

      <div class="hero__summary">
        <div class="hero__title hero__title--stacked">
          <div class="hero__title-line hero__title-line--secondary">
            {{ t("hero.headlineTertiary") }}
          </div>
          <div class="hero__title-line hero__title-line--accent">
            {{ t("hero.headlineQuaternary") }}
          </div>
        </div>
      </div>

      <button class="hero__cta" type="button">
        <span class="hero__cta-text">{{ t("hero.cta") }}</span>
        <span class="hero__cta-arrow" aria-hidden="true">↗</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 1064px;
  width: 100%;
  color: var(--color-text);
  isolation: isolate;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    z-index: 0;
  }

  &__image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: none;

    &--desktop {
      background-image: url("/assets/hero/hero-bg-desktop.jpg");
    }

    &--mobile {
      display: none;
      background-image: url("/assets/hero/hero-bg-mobile.jpg");
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.32) 0%,
      rgba(0, 0, 0, 0.42) 100%
    );
    mix-blend-mode: multiply;
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 1920px;
    height: 1064px;
    margin: 0 auto;
    padding: 0 64px;
  }

  &__topbar {
    position: absolute;
    top: 39px;
    left: 64px;
    right: 64px;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 32px;
  }

  &__brand {
    width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  &__brand-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__contact {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 72px;
    width: 513px;

    @media (max-width: 768px) {
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  &__meta {
    padding: 0;
    border-radius: 0;
    font-size: 18px;
    line-height: 22px;
    white-space: pre-line;
    border: none;
    box-shadow: none;
    backdrop-filter: none;
    min-width: 220px;
    max-width: 260px;
  }

  &__meta-title {
    margin: 0;
    font-family: var(--font-display);
    text-transform: uppercase;
    font-weight: 300;
    line-height: 1.1;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
  }

  &__social {
    display: flex;
    gap: 16px;
  }

  &__social-button {
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;

    img {
      width: 56px;
      height: 56px;
      display: block;
    }
  }

  &__lang {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 100px;
    background: transparent;
    border: 1px solid #f9f9f9;
    box-shadow: none;
  }

  &__lang-button {
    border: none;
    background: transparent;
    color: var(--color-text);
    padding: 9px 12px;
    height: 40px;
    min-width: 60px;
    border-radius: 100px;
    font-size: 18px;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 22px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &--active {
      background: var(--color-text);
      color: #111;
      font-weight: 400;
    }
  }

  &__menu {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    display: grid;
    place-items: center;
    padding: 0;
    cursor: pointer;

    img {
      width: 32px;
      height: 32px;
      display: block;
    }
  }

  &__headline {
    position: absolute;
    left: 64px;
    top: 275px;
    max-width: 1113px;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 1113px;

    &--stacked {
      align-items: flex-end;
      text-align: right;
      gap: 0;
    }
  }

  &__title-line {
    font-family: var(--font-display);
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0.01em;

    &--primary {
      font-size: 94px;
      font-weight: 300;
      line-height: 104px;
    }

    &--secondary {
      font-size: 94px;
      font-weight: 300;
      line-height: 104px;
    }

    &--accent {
      font-size: 124px;
      font-weight: 500;
      font-style: italic;
      color: var(--color-accent);
      font-family: "Classica Two", "Unbounded", serif;
      line-height: 132px;
    }
  }

  &__counter {
    position: absolute;
    top: 183px;
    right: 64px;
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    text-align: right;
  }

  &__counter-value {
    font-family: var(--font-display);
    font-size: 74px;
    color: var(--color-accent);
    font-weight: 700;
    line-height: 78px;
  }

  &__counter-label {
    font-size: 18px;
    max-width: 550px;
    color: var(--color-text);
    text-transform: uppercase;
    font-family: var(--font-display);
    font-weight: 300;
    letter-spacing: 0;
  }

  &__summary {
    position: absolute;
    top: 755px;
    right: 64px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  }

  &__description {
    position: absolute;
    top: 450px;
    right: 67px;
    margin: 0;
    font-size: 18px;
    line-height: 1.4;
    color: var(--color-text);
    text-align: right;
    font-family: "Manrope", system-ui, -apple-system, sans-serif;
  }

  &__cta {
    position: absolute;
    left: 128px;
    top: 920px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: none;
    background: transparent;
    color: var(--color-accent);
    font-family: var(--font-display);
    font-weight: 300;
    font-size: 32px;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    padding: 0;
    cursor: pointer;
  }

  &__cta-arrow {
    font-size: 20px;
    line-height: 1;
  }

  @media (max-width: 1024px) {
    &__content {
      height: auto;
      padding: 20px 16px 56px;
    }

    &__topbar {
      position: static;
      grid-template-columns: 1fr;
      height: auto;
      margin-bottom: 16px;
    }

    &__headline,
    &__counter,
    &__summary,
    &__cta {
      position: static;
    }

    &__headline {
      margin-top: 32px;
    }

    &__counter,
    &__summary {
      align-items: flex-start;
      text-align: left;
      width: 100%;
    }

    &__image--desktop {
      display: none;
    }

    &__image--mobile {
      display: block;
      background-position: center top;
    }

    &__actions {
      justify-content: flex-start;
    }

    &__title-line--primary {
      font-size: clamp(32px, 10vw, 56px);
    }

    &__title-line--secondary,
    &__title-line--accent {
      font-size: clamp(32px, 9vw, 48px);
    }

    &__cta {
      margin-top: 16px;
    }
  }
}
</style>
