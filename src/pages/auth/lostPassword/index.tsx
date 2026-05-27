import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";

import style from "./../auth.module.scss";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function LostPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setSuccessMessage("");
      setFormError(t("pages.auth.lostPassword.errors.required"));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setSuccessMessage("");
      setFormError(t("pages.auth.lostPassword.errors.email"));
      return;
    }

    setFormError("");
    setSuccessMessage(
      t("pages.auth.lostPassword.success", {
        email: trimmedEmail,
      }),
    );
    setEmail("");
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>
              {t("pages.auth.lostPassword.title")}
            </h1>

            <p className={style.subtitle}>
              {t("pages.auth.lostPassword.subtitle")}
            </p>
          </header>

          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.field}>
              <input
                className={style.input}
                type="email"
                placeholder={t("pages.auth.lostPassword.email")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {formError && <p className={style.errorText}>{formError}</p>}

            {successMessage && (
              <p className={style.successText}>{successMessage}</p>
            )}

            <button type="submit" className={style.submitBtn}>
              {t("pages.auth.lostPassword.submit")}
            </button>

            <p className={style.bottomText}>
              {t("pages.auth.lostPassword.rememberPassword")}

              <Link to={getLocalizedPath("/auth/login")}>
                <button type="button" className={style.inlineBtn}>
                  {t("pages.auth.lostPassword.login")}
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}