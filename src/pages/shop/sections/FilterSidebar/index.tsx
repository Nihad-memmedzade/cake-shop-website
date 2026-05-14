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
  return (
    <aside className={style.sidebar}>
      <div className={style.sidebarTop}>
        <div>
          <p className={style.sidebarKicker}>Filter products</p>
          <h2 className={style.sideTitle}>Cake filters</h2>
        </div>

        <button className={style.clearBtn} type="button" onClick={onClearFilters}>
          Reset
        </button>
      </div>

      <FilterContent {...filterProps} />
    </aside>
  );
}
