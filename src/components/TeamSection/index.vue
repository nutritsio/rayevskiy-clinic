<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  photo: string;
};

const { t, tm } = useI18n();

const memberPresets: TeamMember[] = [
  {
    id: 1,
    name: "Vitalii Raievskyi",
    role: "Chief prosthodontist & surgeon",
    description:
      "Specializes in aesthetic and surgical dentistry, implant placement, and prosthetics.",
    photo: "/assets/team/vitaliy.png",
  },
  {
    id: 2,
    name: "Andrii Kotsiura",
    role: "Prosthodontist, gnathologist",
    description:
      "Complex cranio-mandibular full-mouth reconstructions. TMJ dysfunction treatment.",
    photo: "/assets/team/andriy.png",
  },
  {
    id: 3,
    name: "Vadym Tokar",
    role: "Implant surgeon",
    description: "Focuses on smile transformations in a single surgery.",
    photo: "/assets/team/vadym.png",
  },
  {
    id: 4,
    name: "Alina Bratus",
    role: "Orthodontist",
    description:
      "Specializes in aesthetic and therapeutic dentistry, combining professionalism with care for patient comfort.",
    photo: "/assets/team/daria.png",
  },
];

const members = computed<TeamMember[]>(() => {
  const translated = (tm("team.members") as Partial<TeamMember>[] | undefined) || [];
  return memberPresets.map((member, index) => {
    const data = translated[index] || {};
    return {
      ...member,
      name: data.name || member.name,
      role: data.role || member.role,
      description: data.description || member.description,
    };
  });
});

const headingLines = computed(() => {
  const lines = (tm("team.headingLines") as string[] | undefined) || [];
  return lines.length ? lines : ["AESTHETICS &", "MEDICINE"];
});

const headingAccent = computed(
  () => t("team.headingAccent") || "in trusted hands"
);

const introText = computed(
  () =>
    t("team.intro") ||
    "We believe a smile is about comfort and health, not only beauty. Every patient gets a personal approach and a natural-looking result."
);

const navPrevLabel = computed(() => t("team.navPrev"));
const navNextLabel = computed(() => t("team.navNext"));

const activeIndex = ref(0);
const slidesPerView = ref(3.5);
const trackRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragOffsetX = ref(0);
const dragPointerId = ref<number | null>(null);

const maxIndex = computed(() =>
  Math.max(0, Math.ceil(members.value.length - slidesPerView.value))
);

const updateSlidesPerView = () => {
  const width = window.innerWidth;
  if (width <= 768) {
    slidesPerView.value = 1;
  } else if (width <= 1200) {
    slidesPerView.value = 2;
  } else {
    slidesPerView.value = 3.5;
  }
};

const updatePosition = () => {
  const track = trackRef.value;
  const card = cardRefs.value[0];
  if (!track || !card) return;

  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "0");
  const cardWidth = card.getBoundingClientRect().width;
  const offset = (cardWidth + gap) * activeIndex.value;
  track.style.transform = `translateX(${dragOffsetX.value - offset}px)`;
};

const handleResize = () => {
  updateSlidesPerView();
  requestAnimationFrame(updatePosition);
};

const goNext = () => {
  activeIndex.value =
    activeIndex.value >= maxIndex.value ? 0 : activeIndex.value + 1;
};

const goPrev = () => {
  activeIndex.value =
    activeIndex.value <= 0 ? maxIndex.value : activeIndex.value - 1;
};

const onDragStart = (event: PointerEvent) => {
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
  if (!isDragging.value || dragPointerId.value !== event.pointerId) return;
  dragOffsetX.value = event.clientX - dragStartX.value;
  requestAnimationFrame(updatePosition);
};

const onDragEnd = (event: PointerEvent) => {
  if (!isDragging.value || dragPointerId.value !== event.pointerId) return;

  const card = cardRefs.value[0];
  const threshold = card
    ? Math.min(120, card.getBoundingClientRect().width * 0.2)
    : 80;
  const dragged = dragOffsetX.value;

  isDragging.value = false;
  dragPointerId.value = null;
  dragOffsetX.value = 0;

  if (trackRef.value) {
    trackRef.value.style.transition = "transform 360ms ease";
  }

  if (dragged <= -threshold) {
    goNext();
  } else if (dragged >= threshold) {
    goPrev();
  } else {
    requestAnimationFrame(updatePosition);
  }
};

onMounted(() => {
  updateSlidesPerView();
  nextTick(updatePosition);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(activeIndex, () => requestAnimationFrame(updatePosition));

watch(slidesPerView, () => {
  if (activeIndex.value > maxIndex.value) {
    activeIndex.value = maxIndex.value;
  }
  requestAnimationFrame(updatePosition);
});
</script>

<template>
  <section class="team" id="team">
    <div class="container">
      <div class="team__head">
        <div class="team__title">
          <div class="team__title-main">
            <span
              v-for="line in headingLines"
              :key="line"
              class="team__line"
            >
              {{ line }}
            </span>
          </div>
          <div class="team__title-accent">{{ headingAccent }}</div>
        </div>
        <p class="team__intro">
          {{ introText }}
        </p>
      </div>
    </div>

    <div class="team__slider">
      <div class="container">
        <div class="team__controls">
          <button
            class="team__nav-btn team__nav-btn--prev"
            type="button"
            :aria-label="navPrevLabel"
            @click="goPrev"
          >
            ←
          </button>
          <button
            class="team__nav-btn team__nav-btn--next"
            type="button"
            :aria-label="navNextLabel"
            @click="goNext"
          >
            →
          </button>
        </div>
        <div class="team__viewport">
          <div
            ref="trackRef"
            class="team__track"
            :style="{ '--per': slidesPerView }"
            @pointerdown="onDragStart"
            @pointermove="onDragMove"
            @pointerup="onDragEnd"
            @pointercancel="onDragEnd"
          >
            <article
              v-for="member in members"
              :key="member.id"
              class="team__card"
              ref="cardRefs"
            >
              <div class="team__photo">
                <img
                  :src="member.photo"
                  :alt="member.name"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <div class="team__meta">
                <div class="team__info">
                  <div class="team__role">{{ member.role }}</div>
                  <p class="team__desc">{{ member.description }}</p>
                </div>
                <div class="team__name">{{ member.name }}</div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.team {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 116px 0 140px;
}

.team__head {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: end;
  gap: 32px;
  position: relative;
  padding-right: 420px;
}

.team__title {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px;
  max-width: 1180px;
}

.team__title-main {
  font-family: var(--font-display);
  font-size: 92px;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.05;
  text-transform: uppercase;
  max-width: 780px;
}

.team__line {
  display: block;
  white-space: nowrap;
}

.team__title-accent {
  font-family: var(--font-accent);
  font-size: 100px;
  font-weight: 500;
  text-transform: lowercase;
  font-style: italic;
  color: var(--color-accent);
  letter-spacing: 0.03em;
  white-space: nowrap;
  transform: translateY(18px);
  position: absolute;
  left: 41%;
  top: 171px;
}

.team__intro {
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  max-width: 420px;
  color: var(--color-muted);
  line-height: 1.5;
}

.team__slider {
  margin-top: 295px;
  position: relative;
}

.team__slider .container {
  position: relative;
}

.team__controls {
  position: absolute;
  top: -112px;
  right: 32px;
  display: inline-flex;
  gap: 14px;
  z-index: 2;
}

.team__nav-btn {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.38);
  display: grid;
  place-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease,
    transform 0.2s ease;
}

.team__nav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: #ffffff;
  color: #ffffff;
  transform: translateY(-1px);
}

.team__nav-btn:active {
  transform: translateY(0);
}

.team__nav-btn--prev {
  border-color: rgba(255, 255, 255, 0.26);
}

.team__viewport {
  overflow: hidden;
  touch-action: pan-y;
}

.team__track {
  --gap: 28px;
  display: flex;
  gap: var(--gap);
  transform: translateX(0);
  transition: transform 360ms ease;
  will-change: transform;
  user-select: none;
}

.team__card {
  flex: 0 0 calc((100% - (var(--gap) * (var(--per) - 1))) / var(--per));
  background: #f9f9f9;
  color: #0c0c0d;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 480px;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.32);
  padding: 20px 20px 56px;
}

.team__photo {
  background: #0c0c0d;
  padding: 0;
}

.team__photo img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.team__meta {
  padding: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
}

.team__info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.team__role {
  color: #111;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -1.12px;
  flex: 0 0 36%;
  max-width: 180px;
}

.team__desc {
  margin: 0;
  color: #4a4a4a;
  line-height: 1.5;
  font-size: 15px;
  flex: 1 1 auto;
}

.team__name {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: 25px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (min-width: 1025px) and (max-width: 1700px) {
  .team {
    padding: 90px 0 116px;
  }

  .team__head {
    gap: 24px;
    padding-right: 300px;
  }

  .team__title-main {
    font-size: 72px;
    max-width: 620px;
  }

  .team__title-accent {
    font-size: 80px;
    top: 136px;
  }

  .team__intro {
    max-width: 330px;
    font-size: 15px;
  }

  .team__slider {
    margin-top: 230px;
  }

  .team__controls {
    top: -92px;
  }

  .team__nav-btn {
    width: 74px;
    height: 74px;
    font-size: 20px;
  }

  .team__track {
    --gap: 22px;
  }

  .team__card {
    min-height: 430px;
    padding: 16px 16px 40px;
  }

  .team__role {
    font-size: 18px;
  }

  .team__name {
    font-size: 21px;
  }
}

@media (max-width: 1200px) {
  .team {
    padding: 96px 0 120px;
  }

  .team__head {
    grid-template-columns: 1fr;
    align-items: flex-start;
    padding-right: 0;
    gap: 20px;
  }

  .team__title {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .team__title-main {
    font-size: clamp(56px, 9vw, 76px);
    max-width: none;
  }

  .team__title-accent {
    position: static;
    transform: none;
    font-size: clamp(54px, 8.4vw, 74px);
    line-height: 0.95;
  }

  .team__intro {
    position: static;
    max-width: none;
  }

  .team__slider {
    margin-top: 140px;
  }

  .team__controls {
    right: 24px;
    top: -96px;
  }
}

@media (max-width: 768px) {
  .team {
    padding: 0 0 96px;
  }

  .team__title {
    gap: 6px;
  }

  .team__title-main {
    font-size: clamp(36px, 11vw, 52px);
    line-height: 1.08;
  }

  .team__title-accent {
    font-size: clamp(36px, 10vw, 50px);
  }

  .team__intro {
    max-width: none;
    font-size: 15px;
    line-height: 1.45;
  }

  .team__slider {
    margin-top: 52px;
  }

  .team__controls {
    display: none;
  }

  .team__track {
    --gap: 16px;
  }

  .team__card {
    flex: 0 0 calc(100% - 44px);
    min-width: calc(100% - 44px);
    min-height: 0;
    padding: 14px 14px 24px;
  }

  .team__role {
    font-size: 18px;
  }

  .team__info {
    flex-direction: column;
    gap: 8px;
  }

  .team__role {
    max-width: none;
    flex: 0 0 auto;
  }

  .team__name {
    font-size: 22px;
  }
}

@media (max-width: 360px) {
  .team__card {
    padding: 12px 12px 20px;
  }

  .team__role {
    font-size: 16px;
  }

  .team__desc {
    font-size: 14px;
  }

  .team__name {
    font-size: 20px;
  }
}
</style>
