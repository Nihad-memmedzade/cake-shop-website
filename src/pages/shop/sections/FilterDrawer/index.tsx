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
            <span>Filter products</span>
            <h3>Cake filters</h3>
          </div>

          <button
            type="button"
            className={style.drawerClose}
            onClick={onClose}
            aria-label="Close filters"
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
            Reset filters
          </button>
        </div>
      </aside>
    </>
  );
}
