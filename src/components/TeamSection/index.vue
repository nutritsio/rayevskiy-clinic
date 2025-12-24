<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  photo: string;
};

const members: TeamMember[] = [
  {
    id: 1,
    name: "Віталій Раєвський",
    role: "Головний лікар-ортопед, хірург",
    description:
      "Спеціалізується на естетичній та хірургічній стоматології, встановленню імплантатів, протезуванню.",
    photo: "/assets/team/vitaliy.png",
  },
  {
    id: 2,
    name: "Андрій Коцюра",
    role: "Ортопед, гнатолог",
    description:
      "Складні краніо-мандибулярні тотальні ортопедичні реконструкції. Лікування дисфункції СНЩС.",
    photo: "/assets/team/andriy.png",
  },
  {
    id: 3,
    name: "Вадим Токар",
    role: "Хірург-імплантолог",
    description: "Спеціалізація — трансформація посмішки за одну операцію.",
    photo: "/assets/team/vadym.png",
  },
  {
    id: 4,
    name: "Дар’я",
    role: "Дантист",
    description:
      "Спеціалізується на естетичній та терапевтичній стоматології, поєднуючи професіоналізм із турботою про комфорт пацієнтів.",
    photo: "/assets/team/vadym.png",
  },
];

const activeIndex = ref(0);
const slidesPerView = ref(3.5);
const trackRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

const maxIndex = computed(() =>
  Math.max(0, Math.ceil(members.length - slidesPerView.value))
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
  track.style.transform = `translateX(${-offset}px)`;
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
            <span class="team__line">ЕСТЕТИКА ТА</span>
            <span class="team__line">МЕДИЦИНА</span>
          </div>
          <div class="team__title-accent">в надійних руках</div>
        </div>
        <p class="team__intro">
          Віримо, що усмішка — це не лише про красу, а й про комфорт та
          здоров’я. Тому кожен мій пацієнт отримує індивідуальний підхід і
          результат, який виглядає природно.
        </p>
      </div>
    </div>

    <div class="team__slider">
      <div class="container">
        <div class="team__controls">
          <button
            class="team__nav-btn team__nav-btn--prev"
            type="button"
            aria-label="Попередній слайд"
            @click="goPrev"
          >
            ←
          </button>
          <button
            class="team__nav-btn team__nav-btn--next"
            type="button"
            aria-label="Наступний слайд"
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
          >
            <article
              v-for="member in members"
              :key="member.id"
              class="team__card"
              ref="cardRefs"
            >
              <div class="team__photo">
                <img :src="member.photo" :alt="member.name" loading="lazy" />
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
}

.team__track {
  --gap: 28px;
  display: flex;
  gap: var(--gap);
  transform: translateX(0);
  transition: transform 360ms ease;
  will-change: transform;
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

@media (max-width: 1200px) {
  .team__head {
    grid-template-columns: 1fr;
    align-items: flex-start;
    padding-right: 0;
  }

  .team__intro {
    position: static;
    max-width: none;
  }

  .team__controls {
    right: 24px;
  }
}

@media (max-width: 768px) {
  .team {
    padding: 80px 0 110px;
  }

  .team__title {
    gap: 6px;
  }

  .team__intro {
    max-width: none;
  }

  .team__controls {
    top: 16px;
    right: 16px;
    gap: 10px;
  }

  .team__nav-btn {
    width: 64px;
    height: 64px;
    font-size: 18px;
  }

  .team__track {
    --gap: 20px;
  }

  .team__card {
    min-height: 420px;
  }

  .team__info {
    flex-direction: column;
    gap: 8px;
  }

  .team__role {
    max-width: none;
    flex: 0 0 auto;
  }
}
</style>
