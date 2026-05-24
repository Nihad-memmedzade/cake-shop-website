import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AccountLayout from "@/assets/components/accountLayout";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  changePasswordThunk,
  clearAuthMessages,
  updateProfileThunk,
} from "@/store/authSlice";

import styles from "./accountDetail.module.scss";

export default function AccountDetailsContent() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { user, loading, error, successMessage } = useAppSelector(
    (state) => state.auth,
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!user) return;

    const nameParts = user.fullName.split(" ");
    const first = nameParts[0] || "";
    const last = nameParts.slice(1).join(" ");

    setFirstName(first);
    setLastName(last);
    setDisplayName(user.fullName);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLocalError("");
    dispatch(clearAuthMessages());

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    if (fullName.length < 2) {
      setLocalError(t("pages.account.details.errors.fullName"));
      return;
    }

    await dispatch(
      updateProfileThunk({
        fullName,
        email: email.trim(),
      }),
    );

    if (currentPassword || newPassword || confirmNewPassword) {
      if (newPassword.length < 6) {
        setLocalError(t("pages.account.details.errors.passwordLength"));
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setLocalError(t("pages.account.details.errors.passwordMatch"));
        return;
      }

      const result = await dispatch(
        changePasswordThunk({
          currentPassword,
          newPassword,
        }),
      );

      if (changePasswordThunk.fulfilled.match(result)) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    }
  };

  return (
    <AccountLayout title={t("pages.account.details.pageTitle")}>
      <div className={styles.formSection}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>{t("pages.account.details.kicker")}</p>
          <h2>{t("pages.account.details.heading")}</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.rowTwo}>
            <input
              type="text"
              placeholder={t("pages.account.details.firstName")}
              className={styles.input}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />

            <input
              type="text"
              placeholder={t("pages.account.details.lastName")}
              className={styles.input}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder={t("pages.account.details.displayName")}
            className={styles.input}
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            disabled
          />

          <input
            type="email"
            placeholder={t("pages.account.details.email")}
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <div className={styles.passwordBlock}>
            <h3 className={styles.formTitle}>
              {t("pages.account.details.passwordTitle")}
            </h3>

            <input
              type="password"
              placeholder={t("pages.account.details.currentPassword")}
              className={styles.input}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />

            <input
              type="password"
              placeholder={t("pages.account.details.newPassword")}
              className={styles.input}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={6}
            />

            <input
              type="password"
              placeholder={t("pages.account.details.confirmNewPassword")}
              className={styles.input}
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              minLength={6}
            />
          </div>

          {localError && <p className={styles.messageError}>{localError}</p>}
          {error && <p className={styles.messageError}>{error}</p>}
          {successMessage && (
            <p className={styles.messageSuccess}>{successMessage}</p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? t("pages.account.details.saving")
              : t("pages.account.details.save")}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}