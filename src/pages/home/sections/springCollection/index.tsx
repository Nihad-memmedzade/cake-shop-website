import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import dealImage from "@/assets/images/home/collections/cake3.jpg";
import { getLocalizedPath } from "@/helpers/languagePath";

import style from "./springCollection.module.scss";

export default function SpringCollection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className={style.springCollection}>
      <div className={style.overlay} />

      <div className={style.springContainer}>
        <p className={style.tag}>{t("pages.home.springCollection.tag")}</p>

        <h1 className={style.title}>
          {t("pages.home.springCollection.title")}{" "}
          <span>{t("pages.home.springCollection.titleHighlight")}</span>
        </h1>

        <p className={style.subtitle}>
          {t("pages.home.springCollection.subtitle")}
        </p>

        <button
          className={style.cta}
          type="button"
          onClick={() => navigate(getLocalizedPath("/products"))}
        >
          {t("pages.home.springCollection.cta")}{" "}
          <span className={style.arrow}>-&gt;</span>
        </button>
      </div>

      <div className={style.imagePanel}>
        <img
          src={dealImage}
          alt={t("pages.home.springCollection.titleHighlight")}
        />
      </div>
    </section>
  );
}