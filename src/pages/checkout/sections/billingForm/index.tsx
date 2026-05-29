import { useTranslation } from "react-i18next";

import styles from "./billingForm.module.scss";

export type BillingFormValues = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postcode: string;
  province: string;
  phone: string;
  email: string;
};

type BillingFormProps = {
  values: BillingFormValues;
  showErrors: boolean;
  onChange: <K extends keyof BillingFormValues>(
    key: K,
    value: BillingFormValues[K],
  ) => void;
};

const getOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const getIsBillingFormValid = (values: BillingFormValues) => {
  return (
    values.firstName.trim().length >= 2 &&
    values.lastName.trim().length >= 2 &&
    values.country.trim().length >= 2 &&
    values.streetAddress.trim().length >= 3 &&
    values.city.trim().length >= 2 &&
    values.postcode.trim().length >= 2 &&
    values.phone.trim().length >= 5 &&
    isValidEmail(values.email)
  );
};

export default function BillingForm({
  values,
  showErrors,
  onChange,
}: BillingFormProps) {
  const { t } = useTranslation();

  const getInputClassName = (field: keyof BillingFormValues) => {
    const value = values[field].trim();

    if (!showErrors) {
      return "";
    }

    if (!value) {
      return styles.inputError;
    }

    if (field === "email" && !isValidEmail(value)) {
      return styles.inputError;
    }

    return "";
  };

  return (
    <section className={styles.billingForm}>
      <h3>{t("pages.checkout.billing.title")}</h3>

      <form className={styles.form}>
        <div className={styles.rowTwo}>
          <input
            type="text"
            placeholder={t("pages.checkout.billing.firstName")}
            value={values.firstName}
            className={getInputClassName("firstName")}
            onChange={(event) => onChange("firstName", event.target.value)}
          />

          <input
            type="text"
            placeholder={t("pages.checkout.billing.lastName")}
            value={values.lastName}
            className={getInputClassName("lastName")}
            onChange={(event) => onChange("lastName", event.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder={t("pages.checkout.billing.company")}
          value={values.companyName}
          onChange={(event) => onChange("companyName", event.target.value)}
        />

        <select
          value={values.country}
          className={getInputClassName("country")}
          onChange={(event) => onChange("country", event.target.value)}
        >
          <option value="" disabled>
            {t("pages.checkout.billing.country")}
          </option>
          <option value="azerbaijan">
            {t("pages.checkout.billing.countries.azerbaijan")}
          </option>
          <option value="poland">
            {t("pages.checkout.billing.countries.poland")}
          </option>
          <option value="turkey">
            {t("pages.checkout.billing.countries.turkey")}
          </option>
        </select>

        <input
          type="text"
          placeholder={t("pages.checkout.billing.street")}
          value={values.streetAddress}
          className={getInputClassName("streetAddress")}
          onChange={(event) => onChange("streetAddress", event.target.value)}
        />

        <input
          type="text"
          placeholder={t("pages.checkout.billing.apartment")}
          value={values.apartment}
          onChange={(event) => onChange("apartment", event.target.value)}
        />

        <input
          type="text"
          placeholder={t("pages.checkout.billing.city")}
          value={values.city}
          className={getInputClassName("city")}
          onChange={(event) => onChange("city", event.target.value)}
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={t("pages.checkout.billing.postcode")}
          value={values.postcode}
          className={getInputClassName("postcode")}
          onChange={(event) =>
            onChange("postcode", getOnlyNumbers(event.target.value))
          }
        />

        <input
          type="text"
          placeholder={t("pages.checkout.billing.province")}
          value={values.province}
          className={getInputClassName("province")}
          onChange={(event) => onChange("province", event.target.value)}
        />

        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={t("pages.checkout.billing.phone")}
          value={values.phone}
          className={getInputClassName("phone")}
          onChange={(event) =>
            onChange("phone", getOnlyNumbers(event.target.value))
          }
        />

        <input
          type="email"
          placeholder={t("pages.checkout.billing.email")}
          value={values.email}
          className={getInputClassName("email")}
          onChange={(event) => onChange("email", event.target.value)}
        />

        {showErrors && !getIsBillingFormValid(values) && (
          <p className={styles.errorText}>
            {t("pages.checkout.billing.error")}
          </p>
        )}
      </form>
    </section>
  );
}