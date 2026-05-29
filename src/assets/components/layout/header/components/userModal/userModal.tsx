import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { getLocalizedPath } from "@/helpers/languagePath";
import type { User } from "@/types/user";

import style from "./userModal.module.scss";

type UserModalProps = {
  isClosing?: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  modalEmail: string;
  modalPassword: string;
  setModalEmail: (value: string) => void;
  setModalPassword: (value: string) => void;
  onClose: () => void;
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  onLogout: () => void;
};

export default function UserModal({
  isClosing = false,
  user,
  error,
  loading,
  modalEmail,
  modalPassword,
  setModalEmail,
  setModalPassword,
  onClose,
  onLogin,
  onLogout,
}: UserModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAccountNavigate = () => {
    onClose();
    navigate(getLocalizedPath("/account/details"));
  };

  return (
    <>
      <div
        className={`${style.backWall} ${
          isClosing ? style.backWallClosing : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`${style.userModal} ${
          isClosing ? style.userModalClosing : ""
        }`}
      >
        <div className={style.modalTop}>
          <div>
            <p className={style.modalKicker}>
              {user
                ? t("common.header.welcome_back")
                : t("common.links.account")}
            </p>

            <h3>
              {user
                ? t("common.header.my_account")
                : t("common.header.login")}
            </h3>
          </div>

          <button type="button" className={style.closeIcon} onClick={onClose}>
            x
          </button>
        </div>

        {user ? (
          <div className={style.formModal}>
            <div className={style.profileBox}>
              <div className={style.avatar}>
                {user.fullName?.charAt(0) || "U"}
              </div>

              <div>
                <p>
                  {t("common.header.welcome_back")},{" "}
                  <strong>{user.fullName}</strong>
                </p>
                <span>{user.email}</span>
              </div>
            </div>

            <button
              type="button"
              className={style.loginBtn}
              onClick={handleAccountNavigate}
            >
              {t("common.header.my_account")}
            </button>

            <button
              type="button"
              className={style.logoutBtn}
              onClick={onLogout}
            >
              {t("common.header.logout")}
            </button>
          </div>
        ) : (
          <form className={style.formModal} onSubmit={onLogin}>
            <div className={style.inputGroup}>
              <label>{t("common.header.email")}</label>
              <input
                className={style.modalInput}
                type="email"
                placeholder="example@mail.com"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label>{t("common.header.password")}</label>
              <input
                className={style.modalInput}
                type="password"
                placeholder={t("common.header.password_placeholder")}
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className={style.errorText}>{error}</p>}

            <button type="submit" className={style.loginBtn} disabled={loading}>
              {loading
                ? t("common.header.logging")
                : t("common.header.login")}
            </button>

            <p className={style.createAcc}>
              {t("common.header.no_account")}{" "}
              <Link to={getLocalizedPath("/auth/register")} onClick={onClose}>
                {t("common.header.create_account")}
              </Link>
            </p>
          </form>
        )}
      </aside>
    </>
  );
}
