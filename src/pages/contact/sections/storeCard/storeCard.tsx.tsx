import style from "./storeCard.module.scss";

interface StoreCardProps  {
  title: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
};

export default function StoreCard({
  title,
  addressLine1,
  addressLine2,
  email,
  phone,
}: StoreCardProps) {
  return (
    <section className={style.topGrid}>
      <div className={style.storeCard}>
        <h2 className={style.storeTitle}>{title}</h2>

        <div className={style.storeBlock}>
          <p>{addressLine1}</p>
          <p>{addressLine2}</p>
        </div>

        <div className={style.storeBlock}>
          <a className={style.storeLink} href={`mailto:${email}`}>
            {email}
          </a>
          <a
            className={style.storeLink}
            href={`tel:${phone.replace(/\s/g, "")}`}
          >
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}

