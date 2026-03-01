<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import ArrowIcon from "../ui/ArrowIcon.vue";

const { t, locale } = useI18n();
const isHeroVideoEnabled = ref(true);

const languages = [
  { code: "ua", label: t("hero.langUa") },
  { code: "en", label: t("hero.langEn") },
];

const setLocale = (code: string) => {
  locale.value = code;
};

const emit = defineEmits<{
  (e: "open-menu"): void;
}>();

const openMenu = () => emit("open-menu");

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

const getNetworkInfo = (): NetworkInformationLike | null => {
  const nav = navigator as Navigator & { connection?: NetworkInformationLike };
  return nav.connection ?? null;
};

let reducedMotionMediaQuery: MediaQueryList | null = null;
let networkInfo: NetworkInformationLike | null = null;

const updateHeroVideoState = () => {
  const hasReducedMotion = reducedMotionMediaQuery?.matches ?? false;
  const saveDataEnabled = networkInfo?.saveData ?? false;
  const effectiveType = networkInfo?.effectiveType ?? "";
  const isSlowNetwork =
    effectiveType === "slow-2g" || effectiveType === "2g";

  isHeroVideoEnabled.value = !(
    hasReducedMotion ||
    saveDataEnabled ||
    isSlowNetwork
  );
};

onMounted(() => {
  if (typeof window === "undefined") return;

  reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  networkInfo = getNetworkInfo();
  updateHeroVideoState();

  if (reducedMotionMediaQuery.addEventListener) {
    reducedMotionMediaQuery.addEventListener("change", updateHeroVideoState);
  } else {
    reducedMotionMediaQuery.addListener(updateHeroVideoState);
  }

  networkInfo?.addEventListener?.("change", updateHeroVideoState);
});

onBeforeUnmount(() => {
  if (!reducedMotionMediaQuery) return;

  if (reducedMotionMediaQuery.removeEventListener) {
    reducedMotionMediaQuery.removeEventListener("change", updateHeroVideoState);
  } else {
    reducedMotionMediaQuery.removeListener(updateHeroVideoState);
  }

  networkInfo?.removeEventListener?.("change", updateHeroVideoState);
});
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero__background" aria-hidden="true">
      <div class="hero__image hero__image--desktop" />
      <div class="hero__image hero__image--mobile" />
      <video
        v-if="isHeroVideoEnabled"
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
        preload="none"
        poster="/assets/hero/hero-bg-desktop.jpg"
      >
        <source src="/assets/hero/hero-bg.webm" type="video/webm" />
        <source src="/assets/hero/hero-bg.mp4" type="video/mp4" />
      </video>
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
              {{ t("hero.addressPrimary") }}
            </p>
          </div>
          <div class="hero__meta">
            <p class="hero__meta-title">
              {{ t("hero.addressSecondary") }}
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
              <a
                class="hero__social-button"
                href="https://www.facebook.com/raievskiy.dental.clinic"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="/assets/header/item-1-209.svg" alt="" />
              </a>
              <a
                class="hero__social-button"
                href="https://www.instagram.com/raievskiy_dental_clinic"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer noopener"
              >
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
          <button
            class="hero__menu"
            type="button"
            aria-label="Menu"
            @click="openMenu"
          >
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

      <a class="hero__cta" href="#consult">
        <span class="hero__cta-text">{{ t("hero.cta") }}</span>
        <span class="hero__cta-arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      </a>
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
    z-index: 0;
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

  &__video {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
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
    gap: 32px;
    width: auto;

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
    color: #9f9f9f;
    font-family: Unbounded;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 22px;
    text-transform: uppercase;
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
    border-radius: 50%;
    border: 1px solid rgba(249, 249, 249, 0.2);
    background: transparent;
    transition: background 0.2s ease, border-color 0.2s ease,
      transform 0.2s ease;
    cursor: pointer;

    img {
      width: 56px;
      height: 56px;
      display: block;
    }

    &:hover {
      background: transparent;
      border-color: rgba(249, 249, 249, 0.35);
      transform: translateY(-1px);
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
      font-family: var(--font-accent);
      text-transform: lowercase;
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
    font-weight: 500;
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
    position: absolute;
    overflow: hidden;
    text-decoration: none;
    transition: color 0.25s ease;

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
    }

    &:hover::after {
      left: 120%;
    }
  }

  &__cta-arrow {
    display: inline-flex;
    align-items: center;

    .arrow-icon {
      width: 40px;
      height: 40px;
      transform: rotate(-90deg);
      transition: transform 0.25s ease, color 0.25s ease;
    }
  }

  @media (min-width: 1025px) and (max-width: 1700px) {
    min-height: 860px;

    &__content {
      max-width: 1500px;
      height: 860px;
      padding: 0 24px;
    }

    &__topbar {
      top: 26px;
      left: 24px;
      right: 24px;
      gap: 20px;
    }

    &__brand {
      width: 244px;
      height: 66px;
    }

    &__contact {
      width: auto;
      gap: 24px;
    }

    &__meta {
      font-size: 15px;
      line-height: 19px;
      min-width: 176px;
      max-width: 220px;
    }

    &__actions {
      gap: 12px;
    }

    &__social {
      gap: 12px;
    }

    &__social-button {
      width: 48px;
      height: 48px;

      img {
        width: 48px;
        height: 48px;
      }
    }

    &__lang {
      gap: 6px;
      padding: 6px;
    }

    &__lang-button {
      height: 34px;
      min-width: 52px;
      padding: 7px 10px;
      font-size: 15px;
      line-height: 1;
    }

    &__menu,
    &__menu img {
      width: 26px;
      height: 26px;
    }

    &__headline {
      left: 24px;
      top: 208px;
      max-width: 820px;
    }

    &__title {
      max-width: 820px;
      gap: 8px;
    }

    &__title-line {
      &--primary,
      &--secondary {
        font-size: 72px;
        line-height: 80px;
      }

      &--accent {
        font-size: 96px;
        line-height: 102px;
      }
    }

    &__counter {
      top: 136px;
      right: 24px;
      width: 430px;
      gap: 4px;
    }

    &__counter-value {
      font-size: 62px;
      line-height: 66px;
    }

    &__counter-label {
      max-width: 430px;
      font-size: 15px;
      line-height: 1.3;
    }

    &__description {
      top: 344px;
      right: 24px;
      max-width: 400px;
      font-size: 16px;
    }

    &__summary {
      top: 604px;
      right: 64px;
      max-width: 320px;
    }

    &__cta {
      left: 48px;
      top: 754px;
      font-size: 26px;
    }

    &__cta-arrow {
      .arrow-icon {
        width: 32px;
        height: 32px;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    min-height: 790px;

    &__content {
      height: 790px;
      padding: 0 20px;
    }

    &__topbar {
      left: 20px;
      right: 20px;
      gap: 14px;
    }

    &__brand {
      width: 210px;
      height: 56px;
    }

    &__contact {
      gap: 18px;
    }

    &__meta {
      min-width: 140px;
      max-width: 174px;
      font-size: 13px;
      line-height: 16px;
    }

    &__social {
      gap: 10px;
    }

    &__social-button {
      width: 42px;
      height: 42px;

      img {
        width: 42px;
        height: 42px;
      }
    }

    &__lang-button {
      min-width: 46px;
      height: 30px;
      font-size: 13px;
      padding: 6px 8px;
    }

    &__headline {
      left: 20px;
      top: 214px;
      max-width: min(62vw, 620px);
    }

    &__title {
      max-width: min(62vw, 620px);
    }

    &__title-line {
      &--primary,
      &--secondary {
        font-size: 58px;
        line-height: 64px;
      }

      &--accent {
        font-size: 78px;
        line-height: 84px;
      }
    }

    &__counter {
      top: 160px;
      right: 20px;
      width: min(31vw, 310px);
    }

    &__counter-value {
      font-size: 54px;
      line-height: 58px;
    }

    &__counter-label {
      max-width: 310px;
      font-size: 13px;
      line-height: 1.3;
    }

    &__description {
      top: 338px;
      right: 20px;
      max-width: 300px;
      font-size: 15px;
    }

    &__summary {
      top: 566px;
      right: 20px;
      max-width: 250px;
    }

    &__cta {
      left: 36px;
      top: 700px;
      font-size: 22px;
    }
  }

  @media (min-width: 1025px) and (max-width: 1120px) {
    min-height: 760px;

    &__content {
      height: 760px;
    }

    &__headline {
      top: 232px;
      max-width: 560px;
      width: 560px;
    }

    &__title {
      max-width: 560px;
      width: 560px;
    }

    &__title-line {
      &--primary,
      &--secondary {
        font-size: 50px;
        line-height: 56px;
      }

      &--accent {
        font-size: 66px;
        line-height: 72px;
      }
    }

    &__counter {
      top: 142px;
      width: 260px;
    }

    &__counter-value {
      font-size: 48px;
      line-height: 52px;
    }

    &__counter-label {
      max-width: 260px;
      font-size: 12px;
    }

    &__description {
      top: 350px;
      max-width: 260px;
      font-size: 14px;
    }

    &__summary {
      top: 550px;
      max-width: 220px;
    }

    &__cta {
      top: 676px;
      font-size: 20px;
    }
  }

  @media (max-width: 1024px) {
    min-height: 100svh;

    &__content {
      min-height: 100svh;
      height: auto;
      padding: 24px 24px 20px;
      display: flex;
      flex-direction: column;
    }

    &__topbar {
      position: static;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 0;
    }

    &__brand {
      width: 190px;
      height: 52px;
    }

    &__contact {
      display: none;
    }

    &__actions {
      width: auto;
      margin-left: auto;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      flex-wrap: nowrap;
    }

    &__lang {
      display: none;
    }

    &__headline,
    &__counter,
    &__summary,
    &__cta,
    &__description {
      position: static;
    }

    &__headline {
      order: 1;
      margin-top: 44px;
      max-width: 100%;
    }

    &__summary {
      order: 2;
      margin-top: 44px;
      width: 100%;
      max-width: 100%;
      align-items: flex-end;
      text-align: right;
    }

    &__description {
      order: 3;
      margin-top: 14px;
      max-width: min(100%, 520px);
      align-self: flex-end;
      text-align: left;
      font-size: 16px;
      line-height: 1.35;
    }

    &__counter {
      order: 4;
      margin-top: 56px;
      align-items: flex-start;
      text-align: left;
      width: 100%;
    }

    &__title--stacked {
      align-items: flex-end;
      text-align: right;
      gap: 0;
    }

    &__title {
      gap: 4px;
    }

    &__image--desktop {
      display: none;
    }

    &__image--mobile {
      display: block;
      background-position: center top;
    }

    &__video {
      display: block;
      object-position: center top;
    }

    &__title-line--primary {
      font-size: clamp(32px, 10vw, 56px);
      line-height: 1.06;
    }

    &__title-line--secondary,
    &__title-line--accent {
      font-size: clamp(32px, 9vw, 48px);
      line-height: 1.06;
    }

    &__cta {
      order: 5;
      margin-top: auto;
      margin-bottom: 6px;
      align-self: center;
      font-size: 22px;
    }
  }

  @media (max-width: 768px) {
    &__content {
      padding: 16px 16px 14px;
    }

    &__brand {
      width: 162px;
      height: 44px;
    }

    &__actions {
      gap: 8px;
    }

    &__social {
      gap: 8px;
    }

    &__social-button {
      width: 52px;
      height: 52px;

      img {
        width: 52px;
        height: 52px;
      }
    }

    &__menu,
    &__menu img {
      width: 30px;
      height: 30px;
    }

    &__headline {
      margin-top: 34px;
    }

    &__summary {
      margin-top: 34px;
    }

    &__description {
      max-width: min(100%, 330px);
      font-size: 15px;
    }

    &__counter {
      margin-top: 44px;
    }

    &__title-line--primary {
      font-size: clamp(30px, 9.4vw, 48px);
      line-height: 1.08;
    }

    &__title-line--secondary,
    &__title-line--accent {
      font-size: clamp(30px, 8.8vw, 44px);
      line-height: 1.05;
    }

    &__counter-value {
      font-size: clamp(42px, 11vw, 56px);
      line-height: 1.05;
    }

    &__counter-label {
      font-size: 14px;
    }

    &__cta {
      font-size: 18px;
    }
  }

  @media (max-width: 500px) {
    &__social-button {
      width: 32px;
      height: 32px;

      img {
        width: 32px;
        height: 32px;
      }
    }

    &__title-line--primary,
    &__title-line--secondary {
      font-size: 30px;
      line-height: 1.08;
    }

    &__counter-label {
      max-width: 215px;
      width: 215px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__video {
      display: none;
    }
  }

  @media (max-width: 360px) {
    &__content {
      padding: 12px 12px 12px;
    }

    &__social-button {
      width: 44px;
      height: 44px;

      img {
        width: 44px;
        height: 44px;
      }
    }

    &__headline {
      margin-top: 24px;
    }

    &__summary {
      margin-top: 28px;
    }

    &__description {
      font-size: 15px;
    }

    &__counter {
      margin-top: 34px;
    }

    &__cta {
      font-size: 16px;
    }
  }
}
</style>
