import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { loginThunk } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import style from "./../auth.module.scss";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password.trim()) {
      setFormError(t("pages.auth.login.errors.required"));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFormError(t("pages.auth.login.errors.email"));
      return;
    }

    setFormError("");

    const result = await dispatch(
      loginThunk({
        email: trimmedEmail,
        password,
      }),
    );

    if (loginThunk.fulfilled.match(result)) {
      navigate(getLocalizedPath("/account/details"));
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>{t("pages.auth.login.title")}</h1>

            <p className={style.subtitle}>{t("pages.auth.login.subtitle")}</p>
          </header>

          <form className={style.form} onSubmit={handleLogin}>
            <div className={style.field}>
              <input
                className={style.input}
                type="email"
                placeholder={t("pages.auth.login.email")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder={t("pages.auth.login.password")}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {(formError || error) && (
              <p className={style.errorText}>{formError || error}</p>
            )}

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" />
                <span>{t("pages.auth.login.remember")}</span>
              </label>

              <button type="button" className={style.inlineBtn}>
                {t("pages.auth.login.forgotPassword")}
              </button>
            </div>

            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading}
            >
              {loading
                ? t("pages.auth.login.loggingIn")
                : t("pages.auth.login.loginButton")}
            </button>

            <p className={style.bottomText}>
              {t("pages.auth.login.noAccount")}

              <Link to={getLocalizedPath("/auth/register")}>
                <button type="button" className={style.inlineBtn}>
                  {t("pages.auth.login.createAccount")}
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
