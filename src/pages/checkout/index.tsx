import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "@/assets/components/checkoutSteps/checkoutSteps";
import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { clearCart } from "@/store/cartSlice";
import { createOrderThunk } from "@/store/orderSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import BillingForm, {
  getIsBillingFormValid,
  type BillingFormValues,
} from "./sections/billingForm";
import OrderSummary from "./sections/orderSummary";
import PaymentMethods, { type PaymentMethod } from "./sections/paymentMethods";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [billingValues, setBillingValues] =
    useState<BillingFormValues>(initialBillingValues);
  const [showBillingErrors, setShowBillingErrors] = useState(false);

  const items = useAppSelector((state: RootState) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const orderLoading = useAppSelector((state: RootState) => state.orders.loading);
  const orderError = useAppSelector((state: RootState) => state.orders.error);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price =
        item.discountedPrice > 0 ? item.discountedPrice : item.price;
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

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate(getLocalizedPath("/auth/login"));
      return;
    }

    if (!isBillingFormValid) {
      setShowBillingErrors(true);
      return;
    }

    const orderItems = items
      .map((item) => ({
        productId: Number(item.id),
        quantity: Number(item.quantity),
        size: item.selectedSize || null,
      }))
      .filter((item) => item.productId > 0 && item.quantity > 0);

    if (!orderItems.length) {
      return;
    }

    const result = await dispatch(
      createOrderThunk({
        paymentMethod,
        billingDetails: {
          firstName: billingValues.firstName.trim(),
          lastName: billingValues.lastName.trim(),
          country: billingValues.country.trim(),
          streetAddress: billingValues.streetAddress.trim(),
          city: billingValues.city.trim(),
          postcode: billingValues.postcode.trim(),
          phone: billingValues.phone.trim(),
          email: billingValues.email.trim(),
        },
        items: orderItems,
      }),
    );

    if (createOrderThunk.fulfilled.match(result)) {
      dispatch(clearCart());
      navigate(getLocalizedPath("/confirmation"));
    }
  };

  return (
    <Layout>
      <main className={styles.checkoutPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{t("pages.checkout.kicker")}</p>
          <h1>{t("pages.checkout.title")}</h1>
          <p className={styles.heroText}>{t("pages.checkout.text")}</p>
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
              disabled={!items.length || orderLoading}
            >
              {orderLoading
                ? t("pages.checkout.placingOrder")
                : t("pages.checkout.placeOrder")}
            </button>

            {!user && (
              <p className={styles.authNotice}>
                {t("pages.checkout.authNotice")}
              </p>
            )}

            {orderError && <p className={styles.authNotice}>{orderError}</p>}
          </aside>
        </section>
      </main>
    </Layout>
  );
}