import style from "./springCollection.module.scss";
import dealImage from "@/assets/images/home/collections/cake3.jpg";

export default function SpringCollection() {
  return (
    <section className={style.springCollection}>
      <div className={style.overlay} />

      <div className={style.springContainer}>
        <p className={style.tag}>weekly sweet deal</p>

        <h1 className={style.title}>
          spring <span>treats</span>
        </h1>

        <p className={style.subtitle}>
          Freshly baked cakes & pastries - limited-time offer.
        </p>

        <button className={style.cta} type="button">
          shop sweets <span className={style.arrow}>-&gt;</span>
        </button>
      </div>

      <div className={style.imagePanel}>
        <img src={dealImage} alt="Spring cake deal" />
      </div>
    </section>
  );
}
