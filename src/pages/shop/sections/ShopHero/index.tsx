import style from "./shopHero.module.scss";

export default function ShopHero() {
  return (
    <section className={style.hero}>
      <p className={style.kicker}>Cake House</p>
      <h1>Shop</h1>
      <p className={style.heroText}>
        Fresh cakes, premium flavors and sweet favorites for every moment.
      </p>
    </section>
  );
}
