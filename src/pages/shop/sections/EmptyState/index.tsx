import { useTranslation } from "react-i18next";

import style from "./emptyState.module.scss";

export default function EmptyState() {
  const { t } = useTranslation();

  return (
    <div className={style.emptyState}>
      <h3>{t("pages.shop.empty.title")}</h3>
      <p>{t("pages.shop.empty.text")}</p>
    </div>
  );
}