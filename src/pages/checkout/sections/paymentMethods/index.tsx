import { useTranslation } from "react-i18next";

import styles from "./paymentMethods.module.scss";

export type PaymentMethod = "cash" | "bank";

type PaymentMethodsProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

export default function PaymentMethods({
  value,
  onChange,
}: PaymentMethodsProps) {
  const { t } = useTranslation();

  const methods: {
    id: PaymentMethod;
    title: string;
    description: string;
  }[] = [
    {
      id: "cash",
      title: t("pages.checkout.payment.cash"),
      description: t("pages.checkout.payment.cashText"),
    },
    {
      id: "bank",
      title: t("pages.checkout.payment.bank"),
      description: t("pages.checkout.payment.bankText"),
    },
  ];

  return (
    <section className={styles.paymentMethods}>
      {methods.map((method) => (
        <label key={method.id} className={styles.paymentItem}>
          <input
            type="radio"
            name="payment"
            checked={value === method.id}
            onChange={() => onChange(method.id)}
          />

          <div>
            <strong>{method.title}</strong>
            <p>{method.description}</p>
          </div>
        </label>
      ))}

      <p className={styles.privacyText}>
        {t("pages.checkout.payment.privacy")}
      </p>
    </section>
  );
}