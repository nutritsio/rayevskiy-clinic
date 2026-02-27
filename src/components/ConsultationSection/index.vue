<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type FormState = {
  name: string;
  service: string;
  phone: string;
  datetime: string;
  message: string;
};

const { t } = useI18n();

type ServiceOption = {
  id: string;
  label: string;
};

const serviceOptions = computed<ServiceOption[]>(() => {
  const titles = [0, 1, 2, 3, 4]
    .map((index) => ({
      id: `service-${index + 1}`,
      label: t(`services.items.${index}.title`),
    }))
    .filter((item) => Boolean(item.label));

  const otherLabel = t("consult.serviceOther");

  return [
    ...titles,
    {
      id: "service-other",
      label: otherLabel,
    },
  ];
});

const initialState: FormState = {
  name: "",
  service: "",
  phone: "",
  datetime: "",
  message: "",
};

const form = ref<FormState>({ ...initialState });
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);
const status = ref<"idle" | "success" | "error">("idle");
const errorMessage = ref("");
const errors = ref<Partial<Record<keyof FormState, string>>>({});
const lastSubmitAt = ref(0);
const SUBMIT_COOLDOWN_MS = 5000;

const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, "");

const validateForm = () => {
  const nextErrors: Partial<Record<keyof FormState, string>> = {};
  const trimmedName = form.value.name.trim();
  const trimmedService = form.value.service.trim();
  const trimmedDatetime = form.value.datetime.trim();
  const phoneDigits = normalizePhone(form.value.phone);

  if (!trimmedName) {
    nextErrors.name = t("consult.validation.nameRequired");
  } else if (trimmedName.length < 2) {
    nextErrors.name = t("consult.validation.nameTooShort");
  }

  if (!trimmedService) {
    nextErrors.service = t("consult.validation.serviceRequired");
  }

  if (!form.value.phone.trim()) {
    nextErrors.phone = t("consult.validation.phoneRequired");
  } else if (phoneDigits.length < 10) {
    nextErrors.phone = t("consult.validation.phoneInvalid");
  }

  if (!trimmedDatetime) {
    nextErrors.datetime = t("consult.validation.datetimeRequired");
  }

  errors.value = nextErrors;
  return Object.keys(nextErrors).length === 0;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selected = target.files?.[0];
  if (selected) {
    file.value = selected;
  }
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const dropped = event.dataTransfer?.files?.[0];
  if (dropped) {
    file.value = dropped;
  }
};

const clearFile = () => {
  file.value = null;
};

const resetForm = () => {
  form.value = { ...initialState };
  file.value = null;
  errors.value = {};
};

const openFileDialog = () => {
  fileInput.value?.click();
};

const handleSubmit = async () => {
  status.value = "idle";
  errorMessage.value = "";

  const now = Date.now();
  const remainingCooldown = SUBMIT_COOLDOWN_MS - (now - lastSubmitAt.value);
  if (remainingCooldown > 0) {
    status.value = "error";
    errorMessage.value = t("consult.validation.cooldown", {
      seconds: Math.ceil(remainingCooldown / 1000),
    });
    return;
  }

  const isValid = validateForm();
  if (!isValid) {
    status.value = "error";
    errorMessage.value = t("consult.validation.fixErrors");
    return;
  }

  isSubmitting.value = true;
  lastSubmitAt.value = now;

  try {
    const body = new FormData();
    body.append("name", form.value.name);
    body.append("service", form.value.service);
    body.append("phone", form.value.phone);
    body.append("datetime", form.value.datetime);
    body.append("message", form.value.message);
    body.append("_gotcha", "");

    if (file.value) {
      body.append("file", file.value);
    }

    const response = await fetch("https://getform.io/f/bqoqkepb", {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    resetForm();
    status.value = "success";
  } catch (error) {
    status.value = "error";
    errorMessage.value =
      error instanceof Error ? error.message : t("consult.errorFallback");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="consult" id="consult">
    <div class="container consult__head">
      <div class="consult__discount">
        <span>{{ t("consult.discountPrefix") }}</span>
        <span class="consult__discount-strong">{{
          t("consult.discountAccent")
        }}</span>
        <span class="consult__discount-suffix">{{
          t("consult.discountSuffix")
        }}</span>
      </div>
      <div class="consult__title">
        <div class="consult__title-main">{{ t("consult.headingPrimary") }}</div>
        <div class="consult__title-accent">
          {{ t("consult.headingAccent") }}
        </div>
      </div>
    </div>

    <div class="container">
      <div class="consult__card">
        <div class="consult__media">
          <img
            src="/assets/vetal.png"
            :alt="t('consult.photoAlt')"
            loading="lazy"
          />
        </div>

        <form class="consult__form" @submit.prevent="handleSubmit" novalidate>
          <div class="consult__form-grid">
            <label class="consult__field">
              <span class="consult__label">{{ t("consult.fields.name") }}</span>
              <input
                v-model="form.name"
                :class="['consult__input', { 'consult__input--invalid': errors.name }]"
                type="text"
                name="name"
                :placeholder="t('consult.placeholders.name')"
                required
                :aria-invalid="Boolean(errors.name)"
              />
              <div v-if="errors.name" class="consult__error">{{ errors.name }}</div>
            </label>

            <label class="consult__field">
              <span class="consult__label">{{
                t("consult.fields.service")
              }}</span>
              <div class="consult__select">
                <select
                  v-model="form.service"
                  :class="[
                    'consult__input consult__select-control',
                    { 'consult__input--invalid': errors.service },
                  ]"
                  name="service"
                  required
                  :aria-invalid="Boolean(errors.service)"
                >
                  <option value="" disabled>
                    {{ t("consult.placeholders.service") }}
                  </option>
                  <option
                    v-for="option in serviceOptions"
                    :key="option.id"
                    :value="option.label"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <span class="consult__select-arrow" aria-hidden="true"></span>
              </div>
              <div v-if="errors.service" class="consult__error">
                {{ errors.service }}
              </div>
            </label>

            <label class="consult__field">
              <span class="consult__label">{{
                t("consult.fields.datetime")
              }}</span>
              <input
                v-model="form.datetime"
                :class="[
                  'consult__input',
                  { 'consult__input--invalid': errors.datetime },
                ]"
                type="text"
                name="datetime"
                :placeholder="t('consult.placeholders.datetime')"
                required
                :aria-invalid="Boolean(errors.datetime)"
              />
              <div v-if="errors.datetime" class="consult__error">
                {{ errors.datetime }}
              </div>
            </label>

            <label class="consult__field">
              <span class="consult__label">{{
                t("consult.fields.phone")
              }}</span>
              <input
                v-model="form.phone"
                :class="[
                  'consult__input',
                  { 'consult__input--invalid': errors.phone },
                ]"
                type="tel"
                name="phone"
                :placeholder="t('consult.placeholders.phone')"
                required
                :aria-invalid="Boolean(errors.phone)"
              />
              <div v-if="errors.phone" class="consult__error">
                {{ errors.phone }}
              </div>
            </label>
          </div>

          <label class="consult__field consult__field--full">
            <span class="consult__label">{{
              t("consult.fields.message")
            }}</span>
            <textarea
              v-model="form.message"
              class="consult__input consult__input--textarea"
              name="message"
              rows="3"
              :placeholder="t('consult.placeholders.message')"
            ></textarea>
          </label>

          <div
            class="consult__upload"
            role="button"
            tabindex="0"
            @dragover.prevent
            @drop="onDrop"
            @click="openFileDialog"
            @keydown.enter.prevent="openFileDialog"
            @keydown.space.prevent="openFileDialog"
          >
            <input
              ref="fileInput"
              class="consult__file-input"
              type="file"
              name="file"
              @change="onFileChange"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <div class="consult__upload-icon">📎</div>
            <div class="consult__upload-text">
              <div>{{ t("consult.upload.title") }}</div>
              <div class="consult__upload-sub">
                {{ t("consult.upload.subtitle") }}
              </div>
            </div>
          </div>

          <div v-if="file" class="consult__file-row">
            <div class="consult__file-icon">📄</div>
            <span class="consult__file-name">{{ file.name }}</span>
            <button
              class="consult__file-remove"
              type="button"
              aria-label="Remove file"
              @click.stop="clearFile"
            >
              ×
            </button>
          </div>

          <input
            type="text"
            name="_gotcha"
            tabindex="-1"
            autocomplete="off"
            class="consult__honeypot"
          />

          <div class="consult__footer">
            <div class="consult__note" v-html="t('consult.note')"></div>

            <button
              class="consult__submit"
              type="submit"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">{{ t("consult.submit") }}</span>
              <span v-else>{{ t("consult.submitting") }}</span>
            </button>
          </div>

          <div class="consult__status" aria-live="polite">
            <span v-if="status === 'success'" class="consult__status--success">
              {{ t("consult.success") }}
            </span>
            <span v-else-if="status === 'error'" class="consult__status--error">
              {{ t("consult.error") }}
              <template v-if="errorMessage"> ({{ errorMessage }})</template>
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.consult {
  background: var(--color-bg);
  color: var(--color-text);
  padding: 120px 0 140px;
}

.consult__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 50px;
}

.consult__discount {
  color: #f9f9f9;
  margin-left: 10%;
  font-family: var(--font-body);
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 400;
  line-height: 34px;
  letter-spacing: -0.9px;
  text-transform: uppercase;
}

.consult__discount-strong {
  font-weight: 600;
  display: inline-block;
  padding: 0 5px;
}

.consult__discount-suffix {
  display: block;
}

.consult__title {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  line-height: 1;
}

.consult__title-main {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 92px);
  font-weight: 300;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.consult__title-accent {
  font-family: var(--font-accent);
  font-size: clamp(64px, 5vw, 110px);
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.02em;
  align-self: flex-start;
  margin-left: -100px;
}

.consult__card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 24px;
  background: #f5f5f5;
  color: #0c0c0d;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  height: 650px;
}

.consult__media {
  position: relative;
  background: #0c0c0d;
  height: 100%;
  overflow: hidden;
}

.consult__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.consult__form {
  padding: 32px 36px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.consult__form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.consult__field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  letter-spacing: 0.01em;
}

.consult__label {
  color: #4a4a4a;
}

.consult__error {
  color: #c13624;
  font-size: 13px;
  line-height: 1.3;
}

.consult__input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #c8c8c8;
  background: transparent;
  color: #0c0c0d;
  font-size: 16px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 160ms ease, color 160ms ease;
}

.consult__input::placeholder {
  color: #9a9a9a;
}

.consult__input--invalid {
  border-color: #c13624;
  color: #c13624;
}

.consult__input:focus {
  border-color: var(--color-accent);
  color: #0c0c0d;
}

.consult__input--textarea {
  resize: vertical;
  min-height: 96px;
}

.consult__select {
  position: relative;
}

.consult__select-control {
  color: #0c0c0d;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 28px;
  cursor: pointer;
  background: transparent;
}

.consult__select-control option[disabled] {
  color: #9a9a9a;
}

.consult__select-arrow {
  position: absolute;
  right: 2px;
  top: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #4a4a4a;
  transform: translateY(-50%);
}

.consult__field--full .consult__input {
  border: 1px solid #c8c8c8;
  border-radius: 10px;
  padding: 12px 14px;
  background: #fafafa;
}

.consult__field--full .consult__input--invalid {
  border-color: #c13624;
}

.consult__upload {
  position: relative;
  border: 1px dashed #9a9a9a;
  border-radius: 12px;
  padding: 18px 16px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: #fff;
  text-align: center;
  transition: border-color 160ms ease, transform 160ms ease,
    background 160ms ease;
}

.consult__upload:hover {
  border-color: var(--color-accent);
  background: #fff7f0;
  transform: translateY(-1px);
}

.consult__file-input {
  display: none;
}

.consult__upload-icon {
  font-size: 24px;
}

.consult__upload-text {
  font-size: 15px;
  color: #1a1a1a;
  font-weight: 600;
}

.consult__upload-sub {
  font-size: 13px;
  color: #666;
  font-weight: 400;
}

.consult__file-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #1a1a1a;
}

.consult__file-icon {
  font-size: 18px;
}

.consult__file-name {
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.consult__file-remove {
  border: none;
  background: transparent;
  color: #c0392b;
  border-radius: 6px;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}

.consult__honeypot {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  height: 0;
  width: 0;
}

.consult__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;
}

.consult__note {
  font-size: 12px;
  color: #6a6a6a;
  max-width: 440px;
  line-height: 1.4;
}

.consult__submit {
  border: none;
  background: var(--color-accent);
  color: #0b0b0b;
  padding: 14px 22px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  min-width: 160px;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
}

.consult__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.consult__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.consult__status {
  min-height: 18px;
  font-size: 13px;
}

.consult__status--success {
  color: #1c7c4d;
}

.consult__status--error {
  color: #c0392b;
}

@media (min-width: 1025px) and (max-width: 1700px) {
  .consult {
    padding: 92px 0 108px;
  }

  .consult__head {
    margin-bottom: 32px;
  }

  .consult__title-main {
    font-size: clamp(34px, 4.2vw, 74px);
  }

  .consult__title-accent {
    font-size: clamp(54px, 4.4vw, 90px);
    margin-left: -72px;
  }

  .consult__card {
    height: 600px;
  }

  .consult__form {
    padding: 28px 30px 22px;
  }
}

@media (max-width: 1024px) {
  .consult__card {
    grid-template-columns: 1fr;
    height: auto;
  }

  .consult__media {
    max-height: 360px;
  }

  .consult__form {
    padding: 32px 28px;
  }
}

@media (max-width: 900px) {
  .consult {
    padding: 96px 0 110px;
  }

  .consult__head {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .consult__title {
    align-items: flex-start;
    text-align: left;
  }

  .consult__title-accent {
    margin-left: 0;
  }

  .consult__form-grid {
    grid-template-columns: 1fr;
  }

  .consult__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .consult__submit {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .consult__card {
    border-radius: 18px;
  }

  .consult__form {
    padding: 24px 18px;
  }

  .consult__upload {
    grid-template-columns: auto 1fr;
  }

  .consult__file {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
