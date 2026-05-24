import { useTranslation } from "react-i18next";

import type { FilterContentProps } from "@/types/shop";
import FilterContent from "../FilterContent";

import style from "./filterSidebar.module.scss";

type FilterSidebarProps = FilterContentProps & {
  onClearFilters: () => void;
};

export default function FilterSidebar({
  onClearFilters,
  ...filterProps
}: FilterSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className={style.sidebar}>
      <div className={style.sidebarTop}>
        <div>
          <p className={style.sidebarKicker}>{t("pages.shop.filters.kicker")}</p>
          <h2 className={style.sideTitle}>{t("pages.shop.filters.title")}</h2>
        </div>

        <button className={style.clearBtn} type="button" onClick={onClearFilters}>
          {t("pages.shop.filters.reset")}
        </button>
      </div>

      <FilterContent {...filterProps} />
    </aside>
  );
}