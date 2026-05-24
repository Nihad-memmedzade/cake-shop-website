import { useMemo } from "react";

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
  const items = useAppSelector((state: RootState) => state.cart.items);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  return (
    <aside className={styles.orderSummary}>
      <h3>Your order</h3>

      <div className={styles.summaryHead}>
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      <div className={styles.items}>
        {items.map((item) => {
          const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;

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
        <span>Subtotal</span>
        <strong>${subtotal}</strong>
      </div>

      <div className={styles.totalLine}>
        <span>Shipping</span>
        <strong>{shipping === 0 ? "Free shipping" : `$${shipping}`}</strong>
      </div>

      <div className={styles.totalLine}>
        <span>VAT</span>
        <strong>${vat}</strong>
      </div>

      <div className={`${styles.totalLine} ${styles.grandTotal}`}>
        <span>Total</span>
        <strong>${total}</strong>
      </div>
    </aside>
  );
}