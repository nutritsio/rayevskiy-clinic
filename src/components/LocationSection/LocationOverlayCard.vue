<script setup lang="ts">
type Props = {
  title: string;
  address: string;
  hours: string;
  mapsLabel: string;
  mapsAriaLabel: string;
  mapsUrl: string;
};

defineProps<Props>();
</script>

<template>
  <div class="location-overlay">
    <div class="location-overlay__content">
      <h3 class="location-overlay__title">{{ title }}</h3>
      <div class="location-overlay__meta">
        <p class="location-overlay__line">
          <svg
            class="location-overlay__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 22C12 22 19 14.8 19 10A7 7 0 1 0 5 10C5 14.8 12 22 12 22Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.8" />
          </svg>
          <span>{{ address }}</span>
        </p>
        <p class="location-overlay__line">
          <svg
            class="location-overlay__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
            <path
              d="M12 7V12L15 14"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ hours }}</span>
        </p>
      </div>
    </div>

    <a
      class="location-overlay__maps"
      :href="mapsUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="mapsAriaLabel"
    >
      <img src="/assets/reviews/google.svg" alt="" aria-hidden="true" />
      <span>{{ mapsLabel }}</span>
    </a>
  </div>
</template>

<style scoped lang="scss">
.location-overlay {
  position: absolute;
  left: 3%;
  right: 3%;
  bottom: 3.8%;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  padding: 32px;
  background: rgba(17, 17, 17, 0.9);
}

.location-overlay__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.location-overlay__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 300;
  line-height: 1.1;
  text-transform: uppercase;
}

.location-overlay__meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.location-overlay__line {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e0e0e0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 300;
  line-height: 1.3;
  text-transform: uppercase;
}

.location-overlay__icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.location-overlay__maps {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 56px;
  border: 1px solid #f9f9f9;
  border-radius: 100px;
  padding: 16px 20px;
  color: #f9f9f9;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.location-overlay__maps img {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.location-overlay__maps:hover {
  background: #f9f9f9;
  color: #111;
}

@media (max-width: 1280px) {
  .location-overlay {
    padding: 20px;
    gap: 20px;
  }

  .location-overlay__title {
    font-size: 28px;
  }

  .location-overlay__line {
    font-size: 14px;
  }

  .location-overlay__maps {
    font-size: 14px;
    min-height: 48px;
    padding: 12px 16px;
  }
}

@media (max-width: 768px) {
  .location-overlay {
    left: 2.5%;
    right: 2.5%;
    bottom: 2.5%;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }

  .location-overlay__title {
    font-size: 26px;
  }
}
</style>
