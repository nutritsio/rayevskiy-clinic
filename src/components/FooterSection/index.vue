<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const currentYear = new Date().getFullYear();

const navLinks = computed(() => [
  { label: t("footer.nav.choose"), href: "#services" },
  { label: t("footer.nav.why"), href: "#about" },
  { label: t("footer.nav.services"), href: "#services" },
  { label: t("footer.nav.doctors"), href: "#team" },
  { label: t("footer.nav.consult"), href: "#hero" },
]);

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/raievskiy.dental.clinic",
    icon: "/assets/header/item-1-209.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/raievskiy_dental_clinic",
    icon: "/assets/header/item-1-210.svg",
  },
];
</script>

<template>
  <footer class="footer" id="footer">
    <div class="container footer__inner">
      <div class="footer__top">
        <img
          class="footer__logo"
          src="/assets/hero/brand.svg"
          alt="Raevskiy logo"
          loading="lazy"
        />
        <div class="footer__headline">{{ t("footer.heading") }}</div>
      </div>

      <div class="footer__body">
        <div class="footer__left">
          <div class="footer__rating-row">
            <div class="footer__rating-value">{{ t("reviews.rating") }}</div>
            <div class="footer__rating-stars">{{ t("reviews.stars") }}</div>
          </div>

          <div class="footer__clinic">{{ t("reviews.clinic") }}</div>
          <div class="footer__address">{{ t("reviews.address") }}</div>
          <div class="footer__address">{{ t("reviews.addressSecondary") }}</div>

          <a
            class="footer__cta"
            href="https://maps.app.goo.gl/JgE4UcntBuGbSLSdA"
            target="_blank"
            rel="noreferrer"
          >
            <span class="footer__cta-icon">
              <img src="/assets/reviews/google.svg" alt="" />
            </span>
            <span class="footer__cta-text">{{ t("reviews.leaveReview") }}</span>
          </a>
        </div>

        <div class="footer__columns">
          <div class="footer__col footer__col--nav">
            <div class="footer__col-title">{{ t("footer.nav.title") }}</div>
            <a
              v-for="link in navLinks"
              :key="link.href"
              class="footer__nav-link"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </div>

          <div class="footer__col footer__col--contacts">
            <div class="footer__col-title">
              {{ t("footer.contacts.title") }}
            </div>
            <a class="footer__nav-link" href="tel:0777775103">077 777 51 03</a>
            <a
              class="footer__nav-link footer__nav-link--muted"
              href="https://maps.google.com/?q=вул.+Василя+Тютюнника,+28а,+Київ"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t("hero.address") }}
            </a>
            <a
              class="footer__nav-link footer__nav-link--muted"
              href="https://maps.google.com/?q=вулиця+Василя+Тютюнника,+39,+Київ,+Україна"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t("reviews.addressSecondary") }}
            </a>
          </div>

          <div class="footer__col footer__col--hours">
            <div class="footer__col-title">{{ t("footer.hours.title") }}</div>
            <div class="footer__nav-link footer__nav-link--muted">
              {{ t("footer.hours.weekdays") }}
            </div>
            <div class="footer__nav-link footer__nav-link--muted">
              {{ t("footer.hours.weekend") }}
            </div>
          </div>

          <div class="footer__col footer__col--social">
            <div class="footer__col-title">{{ t("footer.social.title") }}</div>
            <div class="footer__social">
              <a
                v-for="social in socials"
                :key="social.label"
                class="footer__social-button"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img :src="social.icon" :alt="social.label" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <div class="footer__copyright">© {{ currentYear }}. {{ t("footer.copyright") }}</div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 100px 0 90px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  &__copyright {
    color: #656565;
    font-family: Unbounded;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: -0.64px;
    text-transform: uppercase;
  }
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: 70px;
}

.footer__body {
  display: flex;
  align-items: flex-start;
  gap: 80px;
}

.footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer__left {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 420px;
}

.footer__logo {
  width: 280px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.footer__headline {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 300;
  color: var(--color-accent);
  text-transform: uppercase;
  line-height: 1;
}

.footer__rating-row {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
}

.footer__rating-value {
  font-size: 48px;
  font-weight: 300;
  line-height: 1;
}

.footer__rating-stars {
  font-size: 22px;
  letter-spacing: 2px;
  color: #ff7527;
}

.footer__clinic {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
}

.footer__address {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.footer__cta {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 34px;
  border: 2px solid #e6e6e6;
  background: transparent;
  color: #f2f2f2;
  width: 290px;
  font-size: 18px;
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

.footer__cta-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.footer__cta-text {
  color: #f9f9f9;
  font-family: Unbounded;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
  text-transform: uppercase;
}

.footer__right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1 1 auto;
}

.footer__columns {
  display: flex;
  gap: 32px;
  flex-wrap: nowrap;
  margin-left: auto;
  align-items: flex-start;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.footer__col--nav {
  max-width: 156px;
}

.footer__col--contacts {
  max-width: 176px;
}

.footer__col--hours {
  max-width: 187px;
}

.footer__col--social {
  max-width: 250px;
}

.footer__social {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer__social-button {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(249, 249, 249, 0.2);
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  img {
    width: 52px;
    height: 52px;
    display: block;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(249, 249, 249, 0.35);
    transform: translateY(-1px);
  }
}

.footer__col-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
}

.footer__nav-link {
  font-family: "Manrope", var(--font-body);
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  transition: color 0.25s ease, transform 0.2s ease;
}

.footer__nav-link--muted {
  color: rgba(255, 255, 255, 0.5);
}

.footer__nav-link--accent {
  color: var(--color-accent);
}

.footer__nav-link:hover {
  color: #f9f9f9;
  transform: translateX(2px);
}

.footer__bottom {
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

@media (min-width: 1025px) {
  .footer__col--hours,
  .footer__col--social {
    min-width: max-content;
  }

  .footer__col--hours .footer__col-title,
  .footer__col--social .footer__col-title {
    white-space: nowrap;
  }
}

@media (min-width: 1025px) and (max-width: 1700px) {
  .footer {
    padding: 84px 0 76px;
  }

  .footer__inner {
    gap: 54px;
  }

  .footer__body {
    gap: 52px;
  }

  .footer__logo {
    width: 240px;
  }

  .footer__headline {
    font-size: 42px;
  }

  .footer__left {
    min-width: 340px;
  }

  .footer__rating-value {
    font-size: 40px;
  }

  .footer__rating-stars {
    font-size: 18px;
  }

  .footer__clinic {
    font-size: 38px;
  }

  .footer__address {
    font-size: 17px;
  }

  .footer__cta {
    width: 258px;
    font-size: 16px;
    padding: 14px 16px;
  }

  .footer__cta-text {
    font-size: 14px;
  }

  .footer__columns {
    gap: 24px;
  }

  .footer__col-title {
    font-size: 18px;
  }

  .footer__nav-link {
    font-size: 16px;
  }
}

@media (max-width: 1200px) {
  .footer {
    padding: 72px 0 96px;
  }

  .footer__inner {
    gap: 44px;
  }

  .footer__top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .footer__headline {
    font-size: 30px;
    align-self: flex-start;
  }

  .footer__body {
    flex-direction: column;
    gap: 32px;
  }

  .footer__left {
    min-width: auto;
    width: 100%;
    max-width: 460px;
  }

  .footer__columns {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 0;
    width: 100%;
  }

  .footer__col--hours,
  .footer__col--social {
    min-width: 0;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-top: 44px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 64px 0 24px;
  }

  .footer__left {
    display: none;
  }

  .footer__logo {
    width: 210px;
  }

  .footer__headline {
    font-size: 22px;
  }

  .footer__rating-value {
    font-size: 36px;
  }

  .footer__rating-stars {
    font-size: 16px;
  }

  .footer__clinic {
    font-size: 30px;
  }

  .footer__address {
    font-size: 16px;
  }

  .footer__cta {
    width: min(100%, 290px);
    padding: 12px 14px;
  }

  .footer__cta-text {
    font-size: 14px;
  }

  .footer__col-title {
    font-size: 17px;
  }

  .footer__nav-link {
    font-size: 16px;
  }

  .footer__social-button {
    width: 46px;
    height: 46px;

    img {
      width: 46px;
      height: 46px;
    }
  }

  .footer__copyright {
    font-size: 14px;
    line-height: 1.4;
  }
}

@media (max-width: 360px) {
  .footer__cta {
    width: 100%;
    justify-content: center;
  }

  .footer__cta-text {
    font-size: 13px;
  }
}
</style>
