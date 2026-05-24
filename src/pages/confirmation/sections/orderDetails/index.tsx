import styles from "./orderDetails.module.scss";

type OrderItem = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountedPrice: number;
};

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
  return (
    <section className={styles.orderDetails}>
      <h3>Order details</h3>

      <div className={styles.head}>
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {items.length === 0 ? (
        <p className={styles.emptyText}>No order items found.</p>
      ) : (
        items.map((item) => {
          const price =
            item.discountedPrice > 0 ? item.discountedPrice : item.price;

          return (
            <div key={item.id} className={styles.productLine}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <strong>${price * item.quantity}</strong>
            </div>
          );
        })
      )}

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
    </section>
  );
}