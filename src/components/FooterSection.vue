<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navLinks = [
  { label: t("footer.nav.choose"), href: "#services" },
  { label: t("footer.nav.why"), href: "#about" },
  { label: t("footer.nav.services"), href: "#services" },
  { label: t("footer.nav.doctors"), href: "#team" },
  { label: t("footer.nav.consult"), href: "#hero" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com", accent: true },
  { label: "Facebook", href: "https://www.facebook.com", accent: true },
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

          <button class="footer__cta" type="button">
            <span class="footer__cta-icon">
              <img src="/assets/reviews/google.svg" alt="" />
            </span>
            <span class="footer__cta-text">{{ t("reviews.leaveReview") }}</span>
          </button>
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
            <div class="footer__nav-link">077 777 51 03</div>
            <div class="footer__nav-link footer__nav-link--muted">
              {{ t("hero.address") }}
            </div>
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
            <a
              v-for="social in socials"
              :key="social.label"
              class="footer__nav-link footer__nav-link--accent"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container footer__bottom">
      <div class="footer__copyright">© 2025. {{ t("footer.copyright") }}</div>
      <a class="footer__cookies" href="#cookies">
        {{ t("footer.cookies") }}
      </a>
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
  font-size: 64px;
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

.footer__cookies {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
  font-family: var(--font-display);
  letter-spacing: 0.02em;
  transition: color 0.25s ease;

  &:hover {
    color: #f9f9f9;
  }
}

@media (max-width: 1024px) {
  .footer {
    padding: 72px 0 96px;
  }

  .footer__top {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__headline {
    font-size: 56px;
    align-self: flex-end;
  }

  .footer__body {
    flex-direction: column;
    gap: 40px;
  }

  .footer__left {
    min-width: auto;
  }

  .footer__columns {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
