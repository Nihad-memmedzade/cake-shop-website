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
  return (
    <div className={style.toolbar}>
      <div>
        <div className={style.breadcrumbs}>
          <span>Home</span>
          <span className={style.sep}>/</span>
          <span>Shop</span>
        </div>

        <p className={style.resultCount}>
          {loading ? "Loading products..." : `${itemsCount} products found`}
        </p>
      </div>

      <div className={style.mobileControls}>
        <select
          className={style.select}
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default sorting</option>
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="bestSeller">Best Seller</option>
        </select>

        <button type="button" className={style.filterBtn} onClick={onOpenFilter}>
          Filter
          {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
        </button>
      </div>
    </div>
  );
}
