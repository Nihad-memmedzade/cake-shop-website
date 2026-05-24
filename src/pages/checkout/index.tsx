import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "@/assets/components/checkoutSteps/checkoutSteps";
import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { clearCart } from "@/store/cartSlice";
import { createOrder } from "@/store/orderSlice";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "@/store/store";

import BillingForm, {
  getIsBillingFormValid,
  type BillingFormValues,
} from "./sections/billingForm";
import OrderSummary from "./sections/orderSummary";
import PaymentMethods, {
  type PaymentMethod,
} from "./sections/paymentMethods";

import styles from "./checkout.module.scss";

const initialBillingValues: BillingFormValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: "",
  streetAddress: "",
  apartment: "",
  city: "",
  postcode: "",
  province: "",
  phone: "",
  email: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [billingValues, setBillingValues] =
    useState<BillingFormValues>(initialBillingValues);
  const [showBillingErrors, setShowBillingErrors] = useState(false);

  const items = useAppSelector((state: RootState) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  const shipping = 0;
  const vat = Math.round(subtotal * 0.02);
  const total = subtotal + shipping + vat;
  const isBillingFormValid = getIsBillingFormValid(billingValues);

  const handleBillingChange = <K extends keyof BillingFormValues>(
    key: K,
    value: BillingFormValues[K],
  ) => {
    setBillingValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!user) {
      navigate(getLocalizedPath("/auth/login"));
      return;
    }

    if (!isBillingFormValid) {
      setShowBillingErrors(true);
      return;
    }

    dispatch(
      createOrder({
        userId: user.id,
        paymentMethod,
        billingDetails: billingValues,
        subtotal,
        shipping,
        vat,
        total,
        items,
      }),
    );

    dispatch(clearCart());
    navigate(getLocalizedPath("/confirmation"));
  };

  return (
    <Layout>
      <main className={styles.checkoutPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Cake House</p>
          <h1>Checkout</h1>
          <p className={styles.heroText}>
            Add your delivery details and confirm your sweet order.
          </p>
        </section>

        <CheckoutSteps activeStep={2} />

        <section className={styles.checkoutGrid}>
          <BillingForm
            values={billingValues}
            showErrors={showBillingErrors}
            onChange={handleBillingChange}
          />

          <aside>
            <OrderSummary shipping={shipping} vat={vat} total={total} />

            <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />

            <button
              type="button"
              className={styles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={!items.length}
            >
              Place order
            </button>

            {!user && (
              <p className={styles.authNotice}>
                Please log in before placing your order.
              </p>
            )}
          </aside>
        </section>
      </main>
    </Layout>
  );
}