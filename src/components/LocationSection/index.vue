<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import LocationOverlayCard from "./LocationOverlayCard.vue";

type LocationTab = {
  id: string;
  label: string;
  title: string;
  address: string;
  hours: string;
  mapsUrl: string;
  images: string[];
};

const { t } = useI18n();
const activeTab = ref("center");
const isMobile = ref(false);

const photoIndex = ref(0);
const trackRef = ref<HTMLElement | null>(null);
const slideRefs = ref<HTMLElement[]>([]);

const isDragging = ref(false);
const dragStartX = ref(0);
const dragOffsetX = ref(0);
const dragPointerId = ref<number | null>(null);

const tabs = computed<LocationTab[]>(() => [
  {
    id: "center",
    label: t("location.tabs.center"),
    title: t("location.cards.center.title"),
    address: t("location.cards.center.address"),
    hours: t("location.cards.center.hours"),
    mapsUrl: "https://maps.app.goo.gl/Zd1wQMk6bM4qWXFv8",
    images: [
      "/assets/locations/opt/location1-1.jpg",
      "/assets/locations/opt/location1-2.jpg",
      "/assets/locations/opt/location1-3.jpg",
    ],
  },
  {
    id: "rightBank",
    label: t("location.tabs.rightBank"),
    title: t("location.cards.rightBank.title"),
    address: t("location.cards.rightBank.address"),
    hours: t("location.cards.rightBank.hours"),
    mapsUrl: "https://maps.google.com/?q=Тютюнника+39,+Київ",
    images: [
      "/assets/locations/opt/location2-1.jpg",
      "/assets/locations/opt/location2-2.jpg",
      "/assets/locations/opt/location2-3.jpg",
    ],
  },
]);

const activeLocation = computed<LocationTab>(
  () => tabs.value.find((tab) => tab.id === activeTab.value) || tabs.value[0]!
);

const maxPhotoIndex = computed(() => Math.max(0, activeLocation.value.images.length - 1));

const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const updatePosition = () => {
  if (!isMobile.value) return;

  const track = trackRef.value;
  const slide = slideRefs.value[0];
  if (!track || !slide) return;

  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");
  const slideWidth = slide.getBoundingClientRect().width;
  const offset = (slideWidth + gap) * photoIndex.value;
  track.style.transform = `translateX(${dragOffsetX.value - offset}px)`;
};

const onTabClick = (id: string) => {
  activeTab.value = id;
  photoIndex.value = 0;
  nextTick(updatePosition);
};

const onDragStart = (event: PointerEvent) => {
  if (!isMobile.value) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  const viewport = event.currentTarget as HTMLElement | null;
  if (!viewport) return;

  isDragging.value = true;
  dragPointerId.value = event.pointerId;
  dragStartX.value = event.clientX;
  dragOffsetX.value = 0;

  viewport.setPointerCapture?.(event.pointerId);
  if (trackRef.value) {
    trackRef.value.style.transition = "none";
  }
};

const onDragMove = (event: PointerEvent) => {
  if (!isMobile.value) return;
  if (!isDragging.value || dragPointerId.value !== event.pointerId) return;

  dragOffsetX.value = event.clientX - dragStartX.value;
  requestAnimationFrame(updatePosition);
};

const onDragEnd = (event: PointerEvent) => {
  if (!isMobile.value) return;
  if (!isDragging.value || dragPointerId.value !== event.pointerId) return;

  const slide = slideRefs.value[0];
  const threshold = slide
    ? Math.min(120, slide.getBoundingClientRect().width * 0.2)
    : 80;
  const dragged = dragOffsetX.value;

  isDragging.value = false;
  dragPointerId.value = null;
  dragOffsetX.value = 0;

  if (trackRef.value) {
    trackRef.value.style.transition = "transform 320ms ease";
  }

  if (dragged <= -threshold) {
    photoIndex.value = Math.min(photoIndex.value + 1, maxPhotoIndex.value);
  } else if (dragged >= threshold) {
    photoIndex.value = Math.max(photoIndex.value - 1, 0);
  }

  requestAnimationFrame(updatePosition);
};

const handleResize = () => {
  const wasMobile = isMobile.value;
  updateIsMobile();

  if (wasMobile && !isMobile.value) {
    photoIndex.value = 0;
    dragOffsetX.value = 0;
  }

  requestAnimationFrame(updatePosition);
};

onMounted(() => {
  updateIsMobile();
  nextTick(updatePosition);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(activeTab, () => {
  photoIndex.value = 0;
  nextTick(updatePosition);
});

watch(photoIndex, () => requestAnimationFrame(updatePosition));
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
          @click="onTabClick(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="location__desktop-pane">
        <article class="location__main">
          <img :src="activeLocation.images[0]" :alt="activeLocation.title" loading="lazy" />
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
            :src="activeLocation.images[1]"
            :alt="`${activeLocation.title} view 1`"
            loading="lazy"
          />
          <img
            :src="activeLocation.images[2]"
            :alt="`${activeLocation.title} view 2`"
            loading="lazy"
          />
        </div>
      </div>

      <div class="location__mobile-pane">
        <article class="location__gallery">
          <div
            class="location__viewport"
            @pointerdown="onDragStart"
            @pointermove="onDragMove"
            @pointerup="onDragEnd"
            @pointercancel="onDragEnd"
          >
            <div ref="trackRef" class="location__track">
              <div
                v-for="(image, idx) in activeLocation.images"
                :key="`${activeLocation.id}-${idx}`"
                ref="slideRefs"
                class="location__slide"
              >
                <img
                  :src="image"
                  :alt="`${activeLocation.title} view ${idx + 1}`"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </div>
          </div>

          <LocationOverlayCard
            :title="activeLocation.title"
            :address="activeLocation.address"
            :hours="activeLocation.hours"
            :maps-label="t('location.maps')"
            :maps-aria-label="t('location.mapsAria')"
            :maps-url="activeLocation.mapsUrl"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.location {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 108px 0 136px;
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
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 16px;
  color: #656565;
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 300;
  line-height: 1.1;
  cursor: pointer;
  transition: color 0.25s ease;
}

.location__tab::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #f9f9f9;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.location__tab--active {
  color: #f9f9f9;
}

.location__tab--active::after {
  transform: scaleX(1);
}

.location__desktop-pane {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.95fr);
  gap: 24px;
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
  gap: 24px;
}

.location__side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.location__mobile-pane {
  display: none;
}

.location__gallery {
  position: relative;
}

.location__viewport {
  overflow: hidden;
  touch-action: pan-y;
}

.location__track {
  --gap: 14px;
  display: flex;
  gap: var(--gap);
  transform: translateX(0);
  transition: transform 320ms ease;
  will-change: transform;
  user-select: none;
}

.location__slide {
  flex: 0 0 100%;
  min-width: 100%;
  min-height: 300px;
  overflow: hidden;
}

.location__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (min-width: 1025px) and (max-width: 1700px) {
  .location {
    padding: 88px 0 112px;
  }

  .location__title-main {
    font-size: 76px;
  }

  .location__title-accent {
    font-size: 100px;
  }

  .location__tabs {
    margin-bottom: 28px;
  }

  .location__tab {
    font-size: 32px;
  }

  .location__main {
    min-height: 540px;
  }
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
  .location__desktop-pane {
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
    padding: 72px 0 0;
  }

  .location__heading {
    margin-bottom: 20px;
  }

  .location__title-main {
    font-size: 30px;
    line-height: 1.15;
  }

  .location__title-accent {
    color: #ff6c1c;
    text-align: right;
    font-family: "Classica Two";
    font-size: 44px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
  }

  .location__tabs {
    gap: 14px;
    margin-bottom: 24px;
  }

  .location__tab {
    font-size: 18px;
    padding-bottom: 10px;
  }

  .location__desktop-pane {
    display: none;
  }

  .location__mobile-pane {
    display: block;
  }

  .location__slide {
    flex: 0 0 calc(100% - 44px);
    min-width: calc(100% - 44px);
  }
}
</style>
