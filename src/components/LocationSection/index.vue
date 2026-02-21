<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import LocationOverlayCard from "./LocationOverlayCard.vue";

type LocationTab = {
  id: string;
  label: string;
  title: string;
  address: string;
  hours: string;
  mapsUrl: string;
  images: {
    main: string;
    sideTop: string;
    sideBottom: string;
  };
};

const { t } = useI18n();
const activeTab = ref("center");

const tabs = computed<LocationTab[]>(() => {
  const sharedImages = {
    main: "/assets/locations/opt/location1.jpg",
    sideTop: "/assets/locations/opt/location2.jpg",
    sideBottom: "/assets/locations/opt/location3.jpg",
  };

  return [
    {
      id: "center",
      label: t("location.tabs.center"),
      title: t("location.cards.center.title"),
      address: t("location.cards.center.address"),
      hours: t("location.cards.center.hours"),
      mapsUrl: "https://maps.google.com/?q=вулиця+Василя+Тютюнника,+28а,+Київ",
      images: sharedImages,
    },
    {
      id: "rightBank",
      label: t("location.tabs.rightBank"),
      title: t("location.cards.rightBank.title"),
      address: t("location.cards.rightBank.address"),
      hours: t("location.cards.rightBank.hours"),
      mapsUrl: "https://maps.google.com/?q=вулиця+Василя+Тютюнника,+28а,+Київ",
      images: sharedImages,
    },
  ];
});

const activeLocation = computed<LocationTab>(
  () => tabs.value.find((tab) => tab.id === activeTab.value) || tabs.value[0]!
);
</script>

<template>
  <section class="location" id="location">
    <div class="container">
      <div class="location__heading">
        <h2 class="location__title-main">{{ t("location.headingPrimary") }}</h2>
        <div class="location__title-accent">{{ t("location.headingAccent") }}</div>
      </div>

      <div class="location__tabs" role="tablist" :aria-label="t('location.tabsAria')">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="location__tab"
          :class="{ 'location__tab--active': activeTab === tab.id }"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="location__grid">
        <article class="location__main">
          <img
            :src="activeLocation.images.main"
            :alt="activeLocation.title"
            loading="lazy"
          />
          <LocationOverlayCard
            :title="activeLocation.title"
            :address="activeLocation.address"
            :hours="activeLocation.hours"
            :maps-label="t('location.maps')"
            :maps-aria-label="t('location.mapsAria')"
            :maps-url="activeLocation.mapsUrl"
          />
        </article>

        <div class="location__side">
          <img
            :src="activeLocation.images.sideTop"
            :alt="`${activeLocation.title} view 1`"
            loading="lazy"
          />
          <img
            :src="activeLocation.images.sideBottom"
            :alt="`${activeLocation.title} view 2`"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.location {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 108px 0 136px;
  --location-photo-gap: 24px;
}

.location__heading {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.location__title-main {
  margin: 0;
  font-family: var(--font-display);
  font-size: 100px;
  font-weight: 300;
  line-height: 1.1;
  text-transform: uppercase;
}

.location__title-accent {
  font-family: var(--font-accent);
  font-size: 130px;
  line-height: 1.03;
  color: var(--color-accent);
  font-style: italic;
}

.location__tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 34px;
}

.location__tab {
  border: 0;
  border-bottom: 1px solid transparent;
  background: transparent;
  padding: 0 0 16px;
  color: #656565;
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 300;
  line-height: 1.1;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}

.location__tab--active {
  color: #f9f9f9;
  border-color: #f9f9f9;
}

.location__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.95fr);
  gap: var(--location-photo-gap);
  align-items: stretch;
}

.location__main {
  position: relative;
  min-height: 640px;
  overflow: hidden;
}

.location__main > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.location__side {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: var(--location-photo-gap);
}

.location__side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 1280px) {
  .location {
    padding: 88px 0 112px;
  }

  .location__title-main {
    font-size: 72px;
  }

  .location__title-accent {
    font-size: 92px;
  }

  .location__tab {
    font-size: 30px;
  }

  .location__main {
    min-height: 520px;
  }
}

@media (max-width: 900px) {
  .location__grid {
    grid-template-columns: 1fr;
  }

  .location__main {
    min-height: 420px;
    overflow: visible;
  }

  .location__side {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

@media (max-width: 768px) {
  .location {
    padding: 72px 0 96px;
  }

  .location__heading {
    margin-bottom: 20px;
  }

  .location__title-main {
    font-size: 44px;
    line-height: 1.15;
  }

  .location__title-accent {
    font-size: 66px;
  }

  .location__tabs {
    gap: 14px;
    margin-bottom: 24px;
  }

  .location__tab {
    font-size: 28px;
    padding-bottom: 10px;
  }

  .location__main {
    min-height: 300px;
  }
}
</style>
