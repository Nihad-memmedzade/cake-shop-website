import { useTranslation } from "react-i18next";


import style from "./shopToolbar.module.scss";

type ShopToolbarProps = {
  sort: string;
  itemsCount: number;
  loading: boolean;
  activeFilterCount: number;
  onSortChange: (value: string) => void;
  onOpenFilter: () => void;
};

export default function ShopToolbar({
  sort,
  itemsCount,
  loading,
  activeFilterCount,
  onSortChange,
  onOpenFilter,
}: ShopToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className={style.toolbar}>
      <div>
   

        <p className={style.resultCount}>
          {loading
            ? t("pages.shop.toolbar.loading")
            : t("pages.shop.toolbar.found", { count: itemsCount })}
        </p>
      </div>

      <div className={style.mobileControls}>
        <select
          className={style.select}
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">{t("pages.shop.toolbar.sort.default")}</option>
          <option value="newest">{t("pages.shop.toolbar.sort.newest")}</option>
          <option value="priceLow">{t("pages.shop.toolbar.sort.priceLow")}</option>
          <option value="priceHigh">{t("pages.shop.toolbar.sort.priceHigh")}</option>
          <option value="ratingHigh">{t("pages.shop.toolbar.sort.ratingHigh")}</option>
          <option value="bestSeller">{t("pages.shop.toolbar.sort.bestSeller")}</option>
        </select>

        <button type="button" className={style.filterBtn} onClick={onOpenFilter}>
          {t("pages.shop.toolbar.filter")}
          {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
        </button>
      </div>
    </div>
  );
}