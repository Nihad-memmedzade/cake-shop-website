import { useTranslation } from "react-i18next";

import styles from "./checkoutSteps.module.scss";

type CheckoutStep = {
  number: string;
  title: string;
  description: string;
};

type CheckoutStepsProps = {
  activeStep: 1 | 2 | 3;
};

export default function CheckoutSteps({ activeStep }: CheckoutStepsProps) {
  const { t } = useTranslation();

  const steps: CheckoutStep[] = [
    {
      number: "01",
      title: t("common.checkoutSteps.shoppingBag"),
      description: t("common.checkoutSteps.shoppingBagText"),
    },
    {
      number: "02",
      title: t("common.checkoutSteps.checkout"),
      description: t("common.checkoutSteps.checkoutText"),
    },
    {
      number: "03",
      title: t("common.checkoutSteps.confirmation"),
      description: t("common.checkoutSteps.confirmationText"),
    },
  ];

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