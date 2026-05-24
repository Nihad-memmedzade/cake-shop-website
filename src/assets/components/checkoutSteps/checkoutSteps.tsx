import styles from "./checkoutSteps.module.scss";

type CheckoutStep = {
  number: string;
  title: string;
  description: string;
};

type CheckoutStepsProps = {
  activeStep: 1 | 2 | 3;
};

const steps: CheckoutStep[] = [
  {
    number: "01",
    title: "Shopping Bag",
    description: "Manage your items list",
  },
  {
    number: "02",
    title: "Shipping and Checkout",
    description: "Checkout your items list",
  },
  {
    number: "03",
    title: "Confirmation",
    description: "Review and submit your order",
  },
];

export default function CheckoutSteps({ activeStep }: CheckoutStepsProps) {
  return (
    <section className={styles.steps}>
      {steps.map((step, index) => {
        const currentStep = (index + 1) as 1 | 2 | 3;

        return (
          <div
            key={step.number}
            className={`${styles.step} ${
              currentStep === activeStep ? styles.activeStep : ""
            } ${currentStep < activeStep ? styles.completedStep : ""}`}
          >
            <strong>{step.number}</strong>

            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}