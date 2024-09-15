import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./language_selector/en/translation.json";
import translationKA from "./language_selector/ka/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: translationEN },
    KA: { translation: translationKA },
  },
  lng: "KA",
  fallbackLng: "KA",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
