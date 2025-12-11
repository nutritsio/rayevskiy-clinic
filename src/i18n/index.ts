import { createI18n } from "vue-i18n";

type LocaleMessages = Record<string, any>;

const deepMerge = (target: LocaleMessages, source: LocaleMessages) => {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== "object") {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

const localeModules = import.meta.glob("../**/_/*.json", { eager: true });

const loadLocaleMessages = (locale: string): LocaleMessages => {
  const messages: LocaleMessages = {};

  Object.entries(localeModules).forEach(([path, mod]) => {
    if (path.endsWith(`/${locale}.json`)) {
      const data = (mod as any).default || mod;
      deepMerge(messages, data as LocaleMessages);
    }
  });

  return messages;
};

const messages = {
  en: loadLocaleMessages("en"),
  ua: loadLocaleMessages("ua"),
};

export const i18n = createI18n({
  legacy: false,
  locale: "ua",
  fallbackLocale: "en",
  messages,
});
