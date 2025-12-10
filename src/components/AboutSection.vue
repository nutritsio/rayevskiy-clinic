<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cards = [
  {
    id: "01",
    title: t("about.cards.0.title"),
    text: t("about.cards.0.text"),
    image: "/assets/about/opt/card-I1-240_34-111.jpg",
    offset: false,
  },
  {
    id: "02",
    title: t("about.cards.1.title"),
    text: t("about.cards.1.text"),
    image: "/assets/about/opt/card-I1-241_34-111.jpg",
    offset: true,
  },
  {
    id: "03",
    title: t("about.cards.2.title"),
    text: t("about.cards.2.text"),
    image: "/assets/about/opt/card-I1-242_34-111.jpg",
    offset: false,
  },
  {
    id: "04",
    title: t("about.cards.3.title"),
    text: t("about.cards.3.text"),
    image: "/assets/about/opt/card-I1-243_34-111.jpg",
    offset: true,
  },
];
</script>

<template>
  <section class="about" id="about">
    <div class="container about__inner">
      <div class="about__header">
        <div class="about__title">
          <div class="about__title-line">{{ t("about.headlinePrimary") }}</div>
          <div class="about__title-accent">{{ t("about.headlineAccent") }}</div>
          <div class="about__title-line about__title-line--small">
            {{ t("about.headlineSecondary") }}
          </div>
        </div>
        <div class="about__aside">
          <p class="about__subtitle" v-html="t('about.subtitle')" />
        </div>
      </div>

      <div class="about__grid">
        <article
          v-for="card in cards"
          :key="card.id"
          class="about__card"
          :class="{ 'about__card--offset': card.offset }"
        >
          <div class="about__card-index">{{ card.id }}</div>
          <div
            class="about__card-media"
            :style="{ backgroundImage: `url(${card.image})` }"
          />
          <div class="about__card-body">
            <h3 class="about__card-title">{{ card.title }}</h3>
            <p class="about__card-text">{{ card.text }}</p>
          </div>
        </article>
        <button class="about__cta-floating" type="button">
          {{ t("hero.cta") }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  position: relative;
  padding: 110px 64px 120px;
  background: var(--color-bg);
  color: var(--color-text);

  &__header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 32px;
    margin-bottom: 72px;
  }

  &__title {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__title-line {
    font-family: var(--font-display);
    font-size: 96px;
    font-weight: 300;
    line-height: 110px;
    text-transform: uppercase;

    &--small {
      font-size: 96px;
      line-height: 110px;
    }
  }

  &__title-accent {
    font-family: "ClassicaTwo", "Classica Two", "Unbounded", serif;
    font-size: 150px;
    font-weight: 500;
    font-style: italic;
    color: var(--color-accent);
    line-height: 150px;
    letter-spacing: -8px;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 18px;
  }

  &__subtitle {
    max-width: 260px;
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    text-align: right;
  }

  &__cta {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: none;
    background: var(--color-accent);
    color: var(--color-text);
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
    line-height: 1.2;
    padding: 0 24px;
  }

  &__grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 40px;
    row-gap: 0;
    align-items: start;
    padding-top: 36px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    background: transparent;
    min-height: 566px;
    width: 430px;
    position: relative;
  }

  &__card-media {
    height: 320px;
    background-size: cover;
    background-position: center;
    filter: none;
  }

  &__card-body {
    padding: 18px 0 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__card-index {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--color-accent);
    margin-bottom: 8px;
  }

  &__card-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    line-height: 1.1;
    text-transform: uppercase;
  }

  &__card-text {
    margin: 0;
    font-size: 16px;
    line-height: 1.35;
    color: var(--color-text);
  }

  &__card--offset {
    margin-top: 140px;
  }

  &__cta-floating {
    position: absolute;
    top: -80px;
    right: 50px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: none;
    background: var(--color-accent);
    color: #111;
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 400;
    cursor: pointer;
    line-height: 1.2;
    padding: 0 24px;
  }

  @media (max-width: 1280px) {
    &__grid {
      display: flex;
      gap: 24px;
      overflow-x: auto;
      padding-bottom: 16px;
      scroll-snap-type: x mandatory;
    }

    &__card,
    &__card--offset {
      margin-top: 0;
      scroll-snap-align: start;
      min-width: 320px;
    }

    &__cta-floating {
      position: static;
      align-self: flex-end;
      margin-top: 24px;
    }
  }
}
</style>
