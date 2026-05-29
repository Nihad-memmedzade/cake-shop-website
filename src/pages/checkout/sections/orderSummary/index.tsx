import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector, type RootState } from "@/store/store";

import styles from "./orderSummary.module.scss";

type OrderSummaryProps = {
  shipping: number;
  vat: number;
  total: number;
};

export default function OrderSummary({
  shipping,
  vat,
  total,
}: OrderSummaryProps) {
  const { t } = useTranslation();
  const items = useAppSelector((state: RootState) => state.cart.items);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  return (
    <aside className={styles.orderSummary}>
      <h3>{t("pages.checkout.summary.title")}</h3>

      <div className={styles.summaryHead}>
        <span>{t("common.orderSummary.product")}</span>
        <span>{t("common.orderSummary.subtotal")}</span>
      </div>

      <div className={styles.items}>
        {items.map((item) => {
          const price =
            item.discountedPrice > 0 ? item.discountedPrice : item.price;

          return (
            <div key={item.id} className={styles.item}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <strong>${price * item.quantity}</strong>
            </div>
          );
        })}
      </div>

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
    </aside>
  );
}