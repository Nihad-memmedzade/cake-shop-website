import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { registerThunk } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import style from "./../auth.module.scss";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setFormError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (password.length < 6) {
      setFormError(t("pages.auth.register.errors.passwordLength"));
      return;
    }

    if (confirmPassword.length < 6) {
      setFormError(t("pages.auth.register.errors.confirmPasswordLength"));
      return;
    }

    if (password !== confirmPassword) {
      setFormError(t("pages.auth.register.errors.passwordMatch"));
      return;
    }

    const result = await dispatch(
      registerThunk({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      }),
    );

    if (registerThunk.fulfilled.match(result)) {
      navigate(getLocalizedPath("/account/details"));
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>{t("pages.auth.register.title")}</h1>
            <p className={style.subtitle}>
              {t("pages.auth.register.subtitle")}
            </p>
          </header>

          <form className={style.form} onSubmit={handleRegister}>
            <div className={style.field}>
              <input
                className={style.input}
                type="text"
                placeholder={t("pages.auth.register.fullName")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                minLength={2}
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="email"
                placeholder={t("pages.auth.register.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder={t("pages.auth.register.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder={t("pages.auth.register.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            {formError && <p className={style.errorText}>{formError}</p>}
            {error && <p className={style.errorText}>{error}</p>}

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" required />
                <span>{t("pages.auth.register.terms")}</span>
              </label>
            </div>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading
                ? t("pages.auth.register.creating")
                : t("pages.auth.register.createAccount")}
            </button>

            <p className={style.bottomText}>
              {t("pages.auth.register.alreadyHaveAccount")}
              <Link to={getLocalizedPath("/auth/login")}>
                <button type="button" className={style.inlineBtn}>
                  {t("pages.auth.register.login")}
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}