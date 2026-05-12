import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./category.scss";

import collectionIMG1 from "@/assets/images/home/collections/cake1.jpg";
import collectionIMG2 from "@/assets/images/home/collections/cake3.jpg";
import collectionIMG3 from "@/assets/images/home/collections/cake2.jpg";
import collectionIMG4 from "@/assets/images/home/collections/cake4.jpg";

interface CategoryCard {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  filterKey: "category" | "flavors";
  filterValue: string;
  img?: string;
  layout: "chocolate" | "fruit" | "kids" | "custom";
}

const cards: CategoryCard[] = [
  {
    id: 1,
    title: "Chocolate cakes",
    subtitle: "Best sellers",
    cta: "Order now",
    filterKey: "flavors",
    filterValue: "Chocolate",
    img: collectionIMG1,
    layout: "chocolate",
  },
  {
    id: 2,
    title: "Fruit cakes",
    subtitle: "Fresh & light",
    cta: "Order now",
    filterKey: "category",
    filterValue: "Fruit Cake",
    img: collectionIMG2,
    layout: "fruit",
  },
  {
    id: 3,
    title: "Kids cakes",
    subtitle: "Fun & colorful",
    cta: "Order now",
    filterKey: "category",
    filterValue: "Birthday Cake",
    img: collectionIMG3,
    layout: "kids",
  },
  {
    id: 4,
    title: "Custom cakes",
    subtitle: "Made to order",
    cta: "Order now",
    filterKey: "category",
    filterValue: "Premium Cake",
    img: collectionIMG4,
    layout: "custom",
  },
];

export default function Category() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleFilterClick = (filterKey: string, filterValue: string) => {
    const params = new URLSearchParams();
    params.set(filterKey, filterValue);

    navigate(`/${i18n.language}/products?${params.toString()}`);
  };

  return (
    <section className="category-section">
      <p className="section-kicker">Choose your favorite</p>
      <h1 className="title-category">Categories</h1>

      <div className="categories-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`category-card category-${card.layout}`}
            role="button"
            tabIndex={0}
            onClick={() => handleFilterClick(card.filterKey, card.filterValue)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilterClick(card.filterKey, card.filterValue);
              }
            }}
          >
            <img src={card.img} alt={card.title} className="category-image" />

            <div className="category-text">
              <p className="category-subtitle">{card.subtitle}</p>
              <h3 className="category-title">{card.title}</h3>

              <div className="category-cta">
                <span>{card.cta}</span>
                <span className="cta-icon">&gt;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
