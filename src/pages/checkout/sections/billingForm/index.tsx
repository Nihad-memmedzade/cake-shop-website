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

const requiredFields: (keyof BillingFormValues)[] = [
  "firstName",
  "lastName",
  "country",
  "streetAddress",
  "city",
  "postcode",
  "province",
  "phone",
  "email",
];

const getOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const getIsBillingFormValid = (values: BillingFormValues) => {
  const hasRequiredValues = requiredFields.every(
    (field) => values[field].trim().length > 0,
  );

  return (
    hasRequiredValues &&
    isValidEmail(values.email) &&
    values.phone.trim().length > 0 &&
    values.postcode.trim().length > 0
  );
};

export default function BillingForm({
  values,
  showErrors,
  onChange,
}: BillingFormProps) {
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
      <h3>Billing details</h3>

      <form className={styles.form}>
        <div className={styles.rowTwo}>
          <input
            type="text"
            placeholder="First Name *"
            value={values.firstName}
            className={getInputClassName("firstName")}
            onChange={(event) => onChange("firstName", event.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name *"
            value={values.lastName}
            className={getInputClassName("lastName")}
            onChange={(event) => onChange("lastName", event.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Company Name (optional)"
          value={values.companyName}
          onChange={(event) => onChange("companyName", event.target.value)}
        />

        <select
          value={values.country}
          className={getInputClassName("country")}
          onChange={(event) => onChange("country", event.target.value)}
        >
          <option value="" disabled>
            Country / Region *
          </option>
          <option value="azerbaijan">Azerbaijan</option>
          <option value="poland">Poland</option>
          <option value="turkey">Turkey</option>
        </select>

        <input
          type="text"
          placeholder="Street Address *"
          value={values.streetAddress}
          className={getInputClassName("streetAddress")}
          onChange={(event) => onChange("streetAddress", event.target.value)}
        />

        <input
          type="text"
          placeholder="Apartment, suite, unit (optional)"
          value={values.apartment}
          onChange={(event) => onChange("apartment", event.target.value)}
        />

        <input
          type="text"
          placeholder="Town / City *"
          value={values.city}
          className={getInputClassName("city")}
          onChange={(event) => onChange("city", event.target.value)}
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Postcode / ZIP *"
          value={values.postcode}
          className={getInputClassName("postcode")}
          onChange={(event) =>
            onChange("postcode", getOnlyNumbers(event.target.value))
          }
        />

        <input
          type="text"
          placeholder="Province *"
          value={values.province}
          className={getInputClassName("province")}
          onChange={(event) => onChange("province", event.target.value)}
        />

        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Phone *"
          value={values.phone}
          className={getInputClassName("phone")}
          onChange={(event) =>
            onChange("phone", getOnlyNumbers(event.target.value))
          }
        />

        <input
          type="email"
          placeholder="Your Mail *"
          value={values.email}
          className={getInputClassName("email")}
          onChange={(event) => onChange("email", event.target.value)}
        />

        {showErrors && !getIsBillingFormValid(values) && (
          <p className={styles.errorText}>
            Please fill in all required fields correctly before placing your
            order.
          </p>
        )}
      </form>
    </section>
  );
}