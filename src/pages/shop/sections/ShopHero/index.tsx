import { useTranslation } from "react-i18next";

import style from "./shopHero.module.scss";

export default function ShopHero() {
  const { t } = useTranslation();

  return (
    <section className={style.hero}>
      <p className={style.kicker}>{t("pages.shop.hero.kicker")}</p>
      <h1>{t("pages.shop.hero.title")}</h1>
      <p className={style.heroText}>{t("pages.shop.hero.text")}</p>
    </section>
  );
}