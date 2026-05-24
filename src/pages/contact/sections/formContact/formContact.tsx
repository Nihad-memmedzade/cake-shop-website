import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import style from "./formContact.module.scss";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export default function FormContact() {
  const { t } = useTranslation();

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (key: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedMessage = values.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError(t("pages.contact.form.requiredError"));
      setSuccessMessage("");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError(t("pages.contact.form.emailError"));
      setSuccessMessage("");
      return;
    }

    setError("");
    setSuccessMessage(t("pages.contact.form.success"));
    setValues(initialValues);
  };

  return (
    <section className={style.formSection}>
      <p className={style.kicker}>{t("pages.contact.form.kicker")}</p>
      <h2 className={style.formTitle}>{t("pages.contact.form.title")}</h2>

      {error && <p className={style.errorMessage}>{error}</p>}
      {successMessage && (
        <p className={style.successMessage}>{successMessage}</p>
      )}

      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder={t("pages.contact.form.name")}
          required
          name="name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />

        <input
          className={style.input}
          type="email"
          placeholder={t("pages.contact.form.email")}
          required
          name="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />

        <textarea
          className={style.textarea}
          placeholder={t("pages.contact.form.message")}
          name="message"
          rows={8}
          required
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
        />

        <button type="submit" className={style.submitBtn}>
          {t("pages.contact.form.submit")}
        </button>
      </form>
    </section>
  );
}

