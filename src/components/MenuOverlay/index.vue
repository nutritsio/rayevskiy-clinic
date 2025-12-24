<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

import { computed, ref, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const links = computed(() => [
  { label: t('nav.why'), href: '#about' },
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.beforeAfter'), href: '#transform' },
  { label: t('nav.team'), href: '#team' },
  { label: t('nav.cta'), href: '#consult' },
])

const activeLink = ref<string | null>(null)
const closeTimer = ref<number | null>(null)

const close = () => emit('close')

const onLink = (href: string) => {
  activeLink.value = href
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
  }
  closeTimer.value = window.setTimeout(() => {
    emit('close')
  }, 260)
}

onBeforeUnmount(() => {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
  }
})
</script>

<template>
  <teleport to="body">
    <transition name="menu-fade">
      <div v-if="open" class="menu" @click.self="close">
        <div class="menu__inner">
          <header class="menu__top">
            <img class="menu__logo" src="/assets/hero/brand.svg" alt="RAIEVSKIY logo" />
            <button class="menu__close" type="button" aria-label="Close" @click="close">
              ✕
            </button>
          </header>
          <nav class="menu__nav">
            <a
              v-for="link in links"
            :key="link.href"
            class="menu__link"
            :class="{
                'menu__link--active': activeLink === link.href,
              }"
            :href="link.href"
            @click="onLink(link.href)"
          >
            {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  inset: 0;
  background: rgba(12, 12, 13, 0.96);
  z-index: 9999;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 48px 64px;
  opacity: 1;
}

.menu__inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.menu__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__logo {
  height: 64px;
  width: auto;
}

.menu__close {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #f7f7f7;
  font-size: 24px;
  cursor: pointer;
}

.menu__nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 32px;
}

.menu__link {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 300;
  color: #f7f7f7;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  transition: color 200ms ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 100%;
    bottom: -10px;
    height: 3px;
    background: var(--color-accent);
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 220ms ease;
  }
}

.menu__link:hover {
  color: var(--color-accent);
}

.menu__link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.menu__link--active {
  color: var(--color-accent);

  &::after {
    transform: translateX(-50%) scaleX(1);
  }
}

@media (max-width: 768px) {
  .menu {
    padding: 24px 16px;
  }

  .menu__link {
    font-size: 32px;
  }
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
