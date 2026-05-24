import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./category.scss";

import collectionIMG1 from "@/assets/images/home/collections/cake1.jpg";
import collectionIMG2 from "@/assets/images/home/collections/cake3.jpg";
import collectionIMG3 from "@/assets/images/home/collections/cake2.jpg";
import collectionIMG4 from "@/assets/images/home/collections/cake4.jpg";
import { getLocalizedPath } from "@/helpers/languagePath";

type CategoryText = {
  title: string;
  subtitle: string;
  cta: string;
};

type CategoryMeta = {
  id: number;
  filterKey: "category" | "flavors";
  filterValue: string;
  img: string;
  layout: "chocolate" | "fruit" | "kids" | "custom";
};

const cardsMeta: CategoryMeta[] = [
  {
    id: 1,
    filterKey: "category",
    filterValue: "Classic Cake",
    img: collectionIMG1,
    layout: "chocolate",
  },
  {
    id: 2,
    filterKey: "category",
    filterValue: "Fruit Cake",
    img: collectionIMG2,
    layout: "fruit",
  },
  {
    id: 3,
    filterKey: "category",
    filterValue: "Birthday Cake",
    img: collectionIMG3,
    layout: "kids",
  },
  {
    id: 4,
    filterKey: "category",
    filterValue: "Premium Cake",
    img: collectionIMG4,
    layout: "custom",
  },
];

export default function Category() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = t("pages.home.category.cards", {
    returnObjects: true,
  }) as CategoryText[];

  const handleFilterClick = (filterKey: string, filterValue: string) => {
    const params = new URLSearchParams();
    params.set(filterKey, filterValue);

    navigate(getLocalizedPath(`/products?${params.toString()}`));
  };

  return (
    <section className="category-section">
      <p className="section-kicker">{t("pages.home.category.kicker")}</p>
      <h1 className="title-category">{t("pages.home.category.title")}</h1>

      <div className="categories-grid">
        {cardsMeta.map((meta, index) => {
          const card = cards[index];

          return (
            <div
              key={meta.id}
              className={`category-card category-${meta.layout}`}
              role="button"
              tabIndex={0}
              onClick={() => handleFilterClick(meta.filterKey, meta.filterValue)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFilterClick(meta.filterKey, meta.filterValue);
                }
              }}
            >
              <img src={meta.img} alt={card.title} className="category-image" />

              <div className="category-text">
                <p className="category-subtitle">{card.subtitle}</p>
                <h3 className="category-title">{card.title}</h3>

                <div className="category-cta">
                  <span>{card.cta}</span>
                  <span className="cta-icon">&gt;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}