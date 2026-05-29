import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsAZ from "./locales/az/translations.json";
import translationsEN from "./locales/en/translations.json";
import translationsPL from "./locales/pl/translations.json";

const resources = {
  en: { translation: translationsEN },
  az: { translation: translationsAZ },
  pl: { translation: translationsPL },
};

export const languages = [
  { code: "en", name: "English" },
  { code: "az", name: "Az?rbaycanca" },
  { code: "pl", name: "Polski" },
];

export const supportedLngs = languages.map((language) => language.code);

const pathLang = window.location.pathname.split("/")[1];
const savedLang = localStorage.getItem("LANG");

const lng = supportedLngs.includes(pathLang)
  ? pathLang
  : savedLang && supportedLngs.includes(savedLang)
    ? savedLang
    : "en";

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: "en",
  supportedLngs,
  interpolation: {
    escapeValue: false,
  },
  debug: import.meta.env.MODE === "development",
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("LANG", lng);
});

export default i18n;
