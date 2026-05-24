import styles from "./paymentMethods.module.scss";

export type PaymentMethod = "cash" | "bank";

type PaymentMethodsProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

const methods: {
  id: PaymentMethod;
  title: string;
  description: string;
}[] = [
  {
    id: "cash",
    title: "Cash on delivery",
    description: "Pay when your cake order is delivered to your address.",
  },
  {
    id: "bank",
    title: "Bank transfer",
    description:
      "Transfer the payment after placing your order. We will contact you with payment details.",
  },
];

export default function PaymentMethods({
  value,
  onChange,
}: PaymentMethodsProps) {
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
        Your personal data will be used to process your order and support your
        experience throughout this website.
      </p>
    </section>
  );
}