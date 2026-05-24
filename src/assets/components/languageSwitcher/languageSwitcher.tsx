import { Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { supportedLngs } from "@/i18n";

import styles from "./languageSwitcher.module.scss";

const languages = [
  {
    code: "en",
    shortName: "EN",
    triggerName: "EN",
    label: "English",
  },
  {
    code: "az",
    shortName: "AZ",
    triggerName: "AZ",
    label: "Azərbaycan",
  },
  {
    code: "pl",
    shortName: "PL",
    triggerName: "PL",
    label: "Polski",
  },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

type LanguageSwitcherProps = {
  placement?: "top" | "bottom";
};

export default function LanguageSwitcher({
  placement = "bottom",
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) ||
    languages[0];

  const handleChangeLanguage = async (lng: LanguageCode) => {
    const parts = pathname.split("/");
    const pathLang = parts[1];

    if (supportedLngs.includes(pathLang)) {
      parts[1] = lng;
    } else {
      parts.splice(1, 0, lng);
    }

    await i18n.changeLanguage(lng);
    setIsOpen(false);
    navigate(`${parts.join("/")}${search}${hash}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.languageSwitcher} ref={switcherRef}>
      <button
        type="button"
        className={`${styles.languageTrigger} ${
          isOpen ? styles.languageTriggerActive : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change language"
      >
        <Globe2 size={18} strokeWidth={2.2} />
        <span>{currentLanguage.triggerName}</span>
      </button>

      {isOpen && (
        <div
          className={`${styles.languageDropdown} ${
            placement === "top" ? styles.languageDropdownTop : ""
          }`}
        >
          {languages.map((language) => {
            const isActive = currentLanguage.code === language.code;

            return (
              <button
                key={language.code}
                type="button"
                className={`${styles.languageOption} ${
                  isActive ? styles.active : ""
                }`}
                onClick={() => handleChangeLanguage(language.code)}
              >
                <span className={styles.languageCode}>
                  {language.shortName}
                </span>
                <span className={styles.languageLabel}>{language.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}