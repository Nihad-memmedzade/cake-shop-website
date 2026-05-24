import { useTranslation } from "react-i18next";

import type { FilterContentProps } from "@/types/shop";
import FilterContent from "../FilterContent";

import style from "./filterDrawer.module.scss";

type FilterDrawerProps = FilterContentProps & {
  isOpen: boolean;
  onClose: () => void;
  onClearFilters: () => void;
};

export default function FilterDrawer({
  isOpen,
  onClose,
  onClearFilters,
  ...filterProps
}: FilterDrawerProps) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`${style.overlay} ${isOpen ? style.overlayOpen : ""}`}
        onClick={onClose}
      />

      <aside
        className={`${style.drawer} ${isOpen ? style.drawerOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={style.drawerHead}>
          <div>
            <span>{t("pages.shop.filters.kicker")}</span>
            <h3>{t("pages.shop.filters.title")}</h3>
          </div>

          <button
            type="button"
            className={style.drawerClose}
            onClick={onClose}
            aria-label={t("pages.shop.filters.close")}
          >
            x
          </button>
        </div>

        <div className={style.drawerBody}>
          <FilterContent {...filterProps} />

          <button
            type="button"
            className={style.drawerClearBtn}
            onClick={onClearFilters}
          >
            {t("pages.shop.filters.resetFilters")}
          </button>
        </div>
      </aside>
    </>
  );
}