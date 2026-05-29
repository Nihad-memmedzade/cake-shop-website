import { useTranslation } from "react-i18next";

import type { OrderItem } from "@/types/order";

import styles from "./orderDetails.module.scss";

type OrderDetailsProps = {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
};

export default function OrderDetails({
  items,
  subtotal,
  shipping,
  vat,
  total,
}: OrderDetailsProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.orderDetails}>
      <h3>{t("pages.confirmation.details")}</h3>

      <div className={styles.head}>
        <span>{t("common.orderSummary.product")}</span>
        <span>{t("common.orderSummary.subtotal")}</span>
      </div>

      {items.length === 0 ? (
        <p className={styles.emptyText}>
          {t("pages.confirmation.emptyItems")}
        </p>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.productLine}>
            <span>
              {item.title} x {item.quantity}
            </span>

            <strong>${item.subtotal}</strong>
          </div>
        ))
      )}

      <div className={styles.totalLine}>
        <span>{t("common.orderSummary.subtotal")}</span>
        <strong>${subtotal}</strong>
      </div>

      <div className={styles.totalLine}>
        <span>{t("common.orderSummary.shipping")}</span>
        <strong>
          {shipping === 0
            ? t("common.orderSummary.freeShipping")
            : `$${shipping}`}
        </strong>
      </div>

      <div className={styles.totalLine}>
        <span>{t("common.orderSummary.vat")}</span>
        <strong>${vat}</strong>
      </div>

      <div className={`${styles.totalLine} ${styles.grandTotal}`}>
        <span>{t("common.orderSummary.total")}</span>
        <strong>${total}</strong>
      </div>
    </section>
  );
}