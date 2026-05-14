import type { CSSProperties } from "react";
import type { FilterContentProps } from "@/types/shop";
import {
  SHOP_CATEGORIES,
  SHOP_FLAVORS,
  SHOP_SIZES,
  SHOP_TAGS,
} from "../../constants";
import style from "./filterContent.module.scss";

export default function FilterContent({
  selectedCategory,
  selectedFlavors,
  selectedTags,
  selectedSizes,
  minPrice,
  maxPrice,
  onCategoryChange,
  onFlavorChange,
  onTagChange,
  onSizeChange,
  onMinPriceChange,
  onMaxPriceChange,
}: FilterContentProps) {
  const minPercent = Number(minPrice || 0);
  const maxPercent = Number(maxPrice || 100);

  return (
    <>
      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>Cake type</h3>
        </div>

        <div className={style.categoryList}>
          {SHOP_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`${style.categoryBtn} ${
                selectedCategory === category ? style.categoryBtnActive : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>Flavors</h3>
        </div>

        <div className={style.checkList}>
          {SHOP_FLAVORS.map((flavor) => (
            <label key={flavor} className={style.checkItem}>
              <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor)}
                onChange={() => onFlavorChange(flavor)}
              />
              <span>{flavor}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>Dietary options</h3>
        </div>

        <div className={style.checkList}>
          {SHOP_TAGS.map((tag) => (
            <label key={tag} className={style.checkItem}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagChange(tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>Size</h3>
        </div>

        <div className={style.pills}>
          {SHOP_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`${style.pill} ${
                selectedSizes.includes(size) ? style.activeFilter : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>Price range</h3>
        </div>

        <div className={style.priceRangeCard}>
          <div className={style.priceHeader}>
            <span>${minPrice || 0}</span>
            <span>${maxPrice || 100}</span>
          </div>

          <div
            className={style.rangeSlider}
            style={
              {
                "--min-percent": `${minPercent}%`,
                "--max-percent": `${maxPercent}%`,
              } as CSSProperties
            }
          >
            <div className={style.sliderTrack} />
            <div className={style.sliderRange} />

            <input
              type="range"
              min="0"
              max="100"
              value={minPrice || 0}
              onChange={(event) => onMinPriceChange(event.target.value)}
            />

            <input
              type="range"
              min="0"
              max="100"
              value={maxPrice || 100}
              onChange={(event) => onMaxPriceChange(event.target.value)}
            />
          </div>

          <div className={style.priceLabels}>
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>
      </div>
    </>
  );
}
