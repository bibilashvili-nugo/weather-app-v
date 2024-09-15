import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation(); // Destructure `i18n` from `useTranslation`
  const [selectedLang, setSelectedLang] = useState("KA");
  const languages = [
    {
      code: "EN",
      lang: "EN",
      icon: "/Screenshot 2024-09-12 at 1.01.54 PM.png",
    },
    {
      code: "KA",
      lang: "KA",
      icon: "/Screenshot 2024-09-12 at 1.03.27 PM.png",
    },
  ];

  useEffect(() => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      console.log("i18n instance:", i18n);
      const storedLang = localStorage.getItem("language") || "KA";
      setSelectedLang(storedLang);
      i18n
        .changeLanguage(storedLang)
        .catch((err) => console.error("Error changing language:", err));
    } else {
      console.error("i18n instance is not properly initialized");
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = selectedLang === "KA" ? "EN" : "KA";
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n
        .changeLanguage(newLang)
        .catch((err) => console.error("Error changing language:", err));
      setSelectedLang(newLang);
      localStorage.setItem("language", newLang);
    } else {
      console.error("i18n instance is not properly initialized");
    }
  };

  const currentLang = languages.find((lang) => lang.code === selectedLang);

  return (
    <div className="flex items-center">
      <motion.div
        className="relative cursor-pointer w-[55px] h-[30px]"
        key={selectedLang}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleLanguage}
      >
        <img
          src={currentLang?.icon}
          alt={`${currentLang?.lang} flag`}
          className="w-full h-full object-cover rounded-[2px]"
        />
      </motion.div>
    </div>
  );
}
