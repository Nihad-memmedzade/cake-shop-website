import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import type { FilterContentProps } from "@/types/shop";

import {
  SHOP_CATEGORIES,
  SHOP_FLAVORS,
  SHOP_SIZES,
  SHOP_TAGS,
} from "../../constants";

import style from "./filterContent.module.scss";

const categoryLabelKeys: Record<string, string> = {
  "Birthday Cake": "pages.shop.filters.options.categories.birthdayCake",
  "Celebration Cake": "pages.shop.filters.options.categories.celebrationCake",
  "Classic Cake": "pages.shop.filters.options.categories.classicCake",
  Cheesecake: "pages.shop.filters.options.categories.cheesecake",
  "Fruit Cake": "pages.shop.filters.options.categories.fruitCake",
  "Fresh Cake": "pages.shop.filters.options.categories.freshCake",
  "Premium Cake": "pages.shop.filters.options.categories.premiumCake",
};

const flavorLabelKeys: Record<string, string> = {
  Chocolate: "pages.shop.filters.options.flavors.chocolate",
  Strawberry: "pages.shop.filters.options.flavors.strawberry",
  "Red Velvet": "pages.shop.filters.options.flavors.redVelvet",
  Vanilla: "pages.shop.filters.options.flavors.vanilla",
  Caramel: "pages.shop.filters.options.flavors.caramel",
  Blueberry: "pages.shop.filters.options.flavors.blueberry",
  Oreo: "pages.shop.filters.options.flavors.oreo",
  Lemon: "pages.shop.filters.options.flavors.lemon",
  "Cherry Chocolate": "pages.shop.filters.options.flavors.cherryChocolate",
  Pistachio: "pages.shop.filters.options.flavors.pistachio",
};

const tagLabelKeys: Record<string, string> = {
  Vegan: "pages.shop.filters.options.tags.vegan",
  "Gluten Free": "pages.shop.filters.options.tags.glutenFree",
  "Nut Free": "pages.shop.filters.options.tags.nutFree",
  "Dairy Free": "pages.shop.filters.options.tags.dairyFree",
  "Low Sugar": "pages.shop.filters.options.tags.lowSugar",
};

const sizeLabelKeys: Record<string, string> = {
  Small: "pages.shop.filters.options.sizes.small",
  Medium: "pages.shop.filters.options.sizes.medium",
  Large: "pages.shop.filters.options.sizes.large",
};

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
  const { t } = useTranslation();

  const [draftMinPrice, setDraftMinPrice] = useState(minPrice || "0");
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice || "100");

  useEffect(() => {
    setDraftMinPrice(minPrice || "0");
  }, [minPrice]);

  useEffect(() => {
    setDraftMaxPrice(maxPrice || "100");
  }, [maxPrice]);

  const minValue = Number(draftMinPrice || 0);
  const maxValue = Number(draftMaxPrice || 100);

  const handleMinPriceInput = (value: string) => {
    const nextValue = Math.min(Number(value), maxValue - 1);
    setDraftMinPrice(String(nextValue));
  };

  const handleMaxPriceInput = (value: string) => {
    const nextValue = Math.max(Number(value), minValue + 1);
    setDraftMaxPrice(String(nextValue));
  };

  const commitPriceChanges = () => {
    if (draftMinPrice !== (minPrice || "0")) {
      onMinPriceChange(draftMinPrice);
    }

    if (draftMaxPrice !== (maxPrice || "100")) {
      onMaxPriceChange(draftMaxPrice);
    }
  };

  return (
    <>
      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>{t("pages.shop.filters.cakeType")}</h3>
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
              {t(categoryLabelKeys[category] || category)}
            </button>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>{t("pages.shop.filters.flavors")}</h3>
        </div>

        <div className={style.checkList}>
          {SHOP_FLAVORS.map((flavor) => (
            <label key={flavor} className={style.checkItem}>
              <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor)}
                onChange={() => onFlavorChange(flavor)}
              />
              <span>{t(flavorLabelKeys[flavor] || flavor)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>{t("pages.shop.filters.dietary")}</h3>
        </div>

        <div className={style.checkList}>
          {SHOP_TAGS.map((tag) => (
            <label key={tag} className={style.checkItem}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagChange(tag)}
              />
              <span>{t(tagLabelKeys[tag] || tag)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>{t("pages.shop.filters.size")}</h3>
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
              {t(sizeLabelKeys[size] || size)}
            </button>
          ))}
        </div>
      </div>

      <div className={style.block}>
        <div className={style.blockHead}>
          <h3>{t("pages.shop.filters.priceRange")}</h3>
        </div>

        <div className={style.priceRangeCard}>
          <div className={style.priceHeader}>
            <span>${draftMinPrice}</span>
            <span>${draftMaxPrice}</span>
          </div>

          <div
            className={style.rangeSlider}
            style={
              {
                "--min-percent": `${minValue}%`,
                "--max-percent": `${maxValue}%`,
              } as CSSProperties
            }
          >
            <div className={style.sliderTrack} />
            <div className={style.sliderRange} />

            <input
              type="range"
              min="0"
              max="100"
              value={draftMinPrice}
              onChange={(event) => handleMinPriceInput(event.target.value)}
              onMouseUp={commitPriceChanges}
              onTouchEnd={commitPriceChanges}
              onBlur={commitPriceChanges}
            />

            <input
              type="range"
              min="0"
              max="100"
              value={draftMaxPrice}
              onChange={(event) => handleMaxPriceInput(event.target.value)}
              onMouseUp={commitPriceChanges}
              onTouchEnd={commitPriceChanges}
              onBlur={commitPriceChanges}
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