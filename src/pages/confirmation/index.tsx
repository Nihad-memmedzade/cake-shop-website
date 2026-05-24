import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "@/assets/components/checkoutSteps/checkoutSteps";
import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { useAppSelector, type RootState } from "@/store/store";

import OrderDetails from "./sections/orderDetails";

import styles from "./confirmation.module.scss";

export default function Confirmation() {
  const navigate = useNavigate();
  const order = useAppSelector((state: RootState) => state.orders.lastOrder);

  if (!order) {
    return (
      <Layout>
        <main className={styles.confirmationPage}>
          <section className={styles.hero}>
            <p className={styles.kicker}>Cake House</p>
            <h1>Confirmation</h1>
            <p className={styles.heroText}>
              Your order details will appear here after checkout.
            </p>
          </section>

          <CheckoutSteps activeStep={3} />

          <section className={styles.emptyOrder}>
            <h2>No order found</h2>
            <p>Please complete checkout before opening confirmation.</p>

            <button
              type="button"
              onClick={() => navigate(getLocalizedPath("/cart"))}
            >
              Back to cart
            </button>
          </section>
        </main>
      </Layout>
    );
  }

  const paymentLabel =
    order.paymentMethod === "cash" ? "Cash on delivery" : "Bank transfer";

  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(order.createdAt),
  );

  return (
    <Layout>
      <main className={styles.confirmationPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Cake House</p>
          <h1>Confirmation</h1>
          <p className={styles.heroText}>
            Review your order details and track your sweet celebration.
          </p>
        </section>

        <CheckoutSteps activeStep={3} />

        <section className={styles.successBlock}>
          <div className={styles.checkIcon}>
            <Check size={34} strokeWidth={3} />
          </div>

          <h2>Your order is completed!</h2>
          <p>Thank you. Your order has been received.</p>
        </section>

        <section className={styles.orderMeta}>
          <div>
            <span>Order Number</span>
            <strong>{order.orderNumber}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{date}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>${order.total}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{paymentLabel}</strong>
          </div>
        </section>

        <OrderDetails
          items={order.items}
          subtotal={order.subtotal}
          shipping={order.shipping}
          vat={order.vat}
          total={order.total}
        />
      </main>
    </Layout>
  );
}