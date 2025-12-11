<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ArrowIcon from "../ui/ArrowIcon.vue";

const { t } = useI18n();

const services = [
  {
    id: "01",
    title: t("services.items.0.title"),
    detailTitle:
      t("services.items.0.detailTitle") || t("services.items.0.title"),
    detailLeft: t("services.items.0.detailLeft"),
    detailRight: t("services.items.0.detailRight"),
    image: "/assets/services/service-01.png",
  },
  {
    id: "02",
    title: t("services.items.1.title"),
    detailTitle:
      t("services.items.1.detailTitle") || t("services.items.1.title"),
    detailLeft:
      t("services.items.1.detailLeft") || t("services.items.0.detailLeft"),
    detailRight:
      t("services.items.1.detailRight") || t("services.items.0.detailRight"),
    image: "/assets/services/service-01.png",
  },
  {
    id: "03",
    title: t("services.items.2.title"),
    detailTitle:
      t("services.items.2.detailTitle") || t("services.items.2.title"),
    detailLeft:
      t("services.items.2.detailLeft") || t("services.items.0.detailLeft"),
    detailRight:
      t("services.items.2.detailRight") || t("services.items.0.detailRight"),
    image: "/assets/services/service-01.png",
  },
  {
    id: "04",
    title: t("services.items.3.title"),
    detailTitle:
      t("services.items.3.detailTitle") || t("services.items.3.title"),
    detailLeft:
      t("services.items.3.detailLeft") || t("services.items.0.detailLeft"),
    detailRight:
      t("services.items.3.detailRight") || t("services.items.0.detailRight"),
    image: "/assets/services/service-01.png",
  },
  {
    id: "05",
    title: t("services.items.4.title"),
    detailTitle:
      t("services.items.4.detailTitle") || t("services.items.4.title"),
    detailLeft:
      t("services.items.4.detailLeft") || t("services.items.0.detailLeft"),
    detailRight:
      t("services.items.4.detailRight") || t("services.items.0.detailRight"),
    image: "/assets/services/service-01.png",
  },
];

const activeId = ref<string | null>("01");
const activeItem = computed(
  () => services.find((s) => s.id === activeId.value) || null
);

const setActive = (id: string) => {
  activeId.value = activeId.value === id ? null : id;
};
</script>

<template>
  <section class="services" id="services">
    <div class="container">
      <div class="services__head">
        <div class="services__title">
          <div class="services__title-line">
            {{ t("services.headingPrimary") }}
          </div>
          <div class="services__title-accent">
            {{ t("services.headingAccent") }}
          </div>
        </div>
        <p class="services__subtitle">
          {{ t("services.subtitle") }}
        </p>
      </div>
    </div>

    <div class="services__accordion">
      <div class="container">
        <div class="services__divider"></div>
      </div>

      <div class="services__list">
        <div class="container services__list-inner">
          <template v-for="item in services" :key="item.id">
            <button
              v-if="activeId !== item.id"
              class="services__item"
              :class="{ 'services__item--active': activeId === item.id }"
              type="button"
              @click="setActive(item.id)"
            >
              <span class="services__item-index">{{ item.id }}</span>
              <span class="services__item-title">{{ item.title }}</span>
              <span class="services__item-arrow">
                <ArrowIcon />
              </span>
            </button>

            <transition name="services-panel" mode="out-in">
              <div
                v-if="activeId === item.id && activeItem"
                class="services__panel"
                :key="`panel-${item.id}`"
              >
                <div class="services__panel-inner">
                  <div class="services__panel-media">
                    <div class="services__panel-index">
                      {{ activeItem.id }}
                    </div>
                    <img :src="activeItem.image" alt="service" loading="lazy" />
                  </div>

                  <div class="services__panel-content">
                    <div class="services__panel-header">
                      <h3 class="services__panel-title">
                        {{ activeItem.detailTitle }}
                      </h3>
                      <button
                        class="services__panel-close"
                        type="button"
                        @click.stop="activeId = null"
                        aria-label="close"
                      >
                        ✕
                      </button>
                    </div>

                    <div class="services__panel-text">
                      <p class="services__panel-text--left">
                        {{
                          activeItem.detailLeft ||
                          t("services.items.0.detailLeft")
                        }}
                      </p>
                      <p class="services__panel-text--right">
                        {{
                          activeItem.detailRight ||
                          t("services.items.0.detailRight")
                        }}
                      </p>
                    </div>

                    <button class="services__cta" type="button">
                      {{ t("hero.cta") }} ↗
                    </button>
                  </div>
                </div>
              </div>
            </transition>

            <div
              v-if="activeId === item.id"
              class="services__list-divider"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 96px 0 120px;
}

.services__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 48px;
}

.services__title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.services__title-line {
  font-family: var(--font-display);
  font-size: 96px;
  font-weight: 300;
  line-height: 1.1;
  text-transform: uppercase;
}

.services__title-accent {
  font-family: "ClassicaTwo", "Classica Two", "Unbounded", serif;
  font-size: 140px;
  font-weight: 500;
  font-style: italic;
  color: var(--color-accent);
  line-height: 1;
}

.services__subtitle {
  max-width: 320px;
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;
}

.services__accordion {
  margin-top: 32px;
}

.services__divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 auto 20px;
}

.services__panel {
  padding: 28px 0 32px;
}

.services__panel-inner {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.services__panel-media {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 0 0 380px;
}

.services__panel-index {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 300;
  color: var(--color-accent);
  line-height: 1;
}

.services__panel-media img {
  width: 100%;
  max-width: 380px;
  height: 420px;
  display: block;
  object-fit: cover;
}

.services__panel-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1 1 auto;
  min-height: 420px;
  margin-top: 50px;
}

.services__panel-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.services__panel-close {
  border: none;
  background: transparent;
  color: var(--color-text);
  font-size: 22px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-left: auto;
  position: absolute;
  top: -50px;
  right: 0;

  &:hover {
    color: #f9f9f9;
  }
}

.services__panel-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 400;
  color: var(--color-accent);
  text-transform: uppercase;
  line-height: 1.05;
}

.services__panel-text {
  display: flex;
  gap: 40px;
}

.services__panel-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-muted);
}

.services__panel-text--left {
  max-width: 217px;
  flex: 0 0 auto;
}

.services__panel-text--right {
  max-width: 349px;
  flex: 0 0 auto;
  color: #656565 !important;
  font-size: 16px;
}

.services__cta {
  margin-top: auto;
  align-self: flex-end;
  border: none;
  background: transparent;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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

.services__list {
  margin-top: 8px;
}

.services__list-inner {
  display: flex;
  flex-direction: column;
}

.services__item {
  display: grid;
  grid-template-columns: 60px 1fr 56px;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}

.services__item:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: #f9f9f9;
}

.services__item--active {
  color: var(--color-accent);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}

.services__item:active,
.services__item:focus-visible {
  color: #f9f9f9;
  outline: none;
}

.services__item-index {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 300;
  color: currentColor;
  transition: color 0.25s ease;
}

.services__item-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 300;
  text-transform: uppercase;
  color: currentColor;
  transition: color 0.25s ease;
}

.services__item-arrow {
  justify-self: end;
  height: 56px;
  width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.services__item-arrow svg {
  width: 56px;
  height: 56px;
  display: block;
  color: currentColor;
  transition: color 0.25s ease, transform 0.2s ease, filter 0.25s ease;
}

.services-panel-enter-active,
.services-panel-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.services-panel-enter-from,
.services-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.services__list-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 8px;
}

@media (max-width: 1024px) {
  .services__title-line {
    font-size: 64px;
  }

  .services__title-accent {
    font-size: 96px;
  }

  .services__panel-inner {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }

  .services__panel-text {
    grid-template-columns: 1fr;
  }

  .services__panel-title {
    font-size: 36px;
  }

  .services__item-title {
    font-size: 18px;
  }
}

@media (max-width: 640px) {
  .services__panel-media img {
    max-width: 100%;
    height: auto;
  }

  .services__panel-title {
    font-size: 28px;
  }

  .services__panel-text {
    column-gap: 20px;
  }

  .services__panel-text--left,
  .services__panel-text--right {
    max-width: none;
  }

  .services__cta {
    justify-self: start;
  }
}
</style>
