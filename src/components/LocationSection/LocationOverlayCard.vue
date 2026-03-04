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
  gap: clamp(14px, 2vw, 30px);
  padding: clamp(16px, 2vw, 32px);
  background: rgba(17, 17, 17, 0.9);
  box-sizing: border-box;
  flex-wrap: wrap;
}

.location-overlay__content {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.5vw, 24px);
  flex: 1 1 420px;
  min-width: 0;
}

.location-overlay__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(16px, 1.2vw, 24px);
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
  font-size: clamp(13px, 0.92vw, 16px);
  font-weight: 300;
  line-height: 1.3;
  text-transform: uppercase;
  min-width: 0;
}

.location-overlay__line span {
  min-width: 0;
  overflow-wrap: anywhere;
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
  white-space: nowrap;
  min-height: 56px;
  border: 1px solid #f9f9f9;
  border-radius: 100px;
  padding: 16px 20px;
  color: #f9f9f9;
  font-family: var(--font-display);
  font-size: clamp(13px, 1vw, 18px);
  font-weight: 300;
  text-transform: uppercase;
  transition: background-color 0.25s ease, color 0.25s ease;
  flex: 0 1 auto;
  max-width: 100%;
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

@media (min-width: 1025px) and (max-width: 1700px) {
  .location-overlay {
    padding: 24px;
    gap: 20px;
  }

  .location-overlay__title {
    font-size: clamp(16px, 1.2vw, 22px);
  }

  .location-overlay__line {
    font-size: clamp(13px, 0.9vw, 15px);
  }

  .location-overlay__maps {
    min-height: 48px;
    font-size: clamp(13px, 0.9vw, 15px);
    padding: 12px 16px;
  }
}

@media (max-width: 1280px) {
  .location-overlay {
    padding: 20px;
    gap: 20px;
  }

  .location-overlay__title {
    font-size: clamp(16px, 1.6vw, 20px);
  }

  .location-overlay__line {
    font-size: clamp(13px, 1.1vw, 14px);
  }

  .location-overlay__maps {
    font-size: 14px;
    min-height: 48px;
    padding: 12px 16px;
  }
}

@media (max-width: 768px) {
  .location-overlay {
    position: static;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
    margin-top: 16px;
    padding: 0 6px;
    background: transparent;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .location-overlay__content {
    flex: none;
    width: 100%;
    gap: 14px;
  }

  .location-overlay__title {
    font-size: 24px;
    line-height: 1.1;
  }

  .location-overlay__meta {
    gap: 10px;
  }

  .location-overlay__line {
    font-size: 18px;
    line-height: 1.25;
  }

  .location-overlay__maps {
    width: 100%;
    justify-content: center;
    min-height: 40px;
    font-size: 14px;
  }
}
</style>
