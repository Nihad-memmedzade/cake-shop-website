import { Link, useNavigate } from "react-router-dom";

import style from "./userModal.module.scss";

type UserModalProps = {
  isClosing?: boolean;
  user: any;
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
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${style.backWall} ${isClosing ? style.backWallClosing : ""}`}
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
              {user ? "Welcome back" : "Account"}
            </p>
            <h3>{user ? "My account" : "Login"}</h3>
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
                  Welcome, <strong>{user.fullName}</strong>
                </p>
                <span>{user.email}</span>
              </div>
            </div>

            <button
              type="button"
              className={style.loginBtn}
              onClick={() => {
                onClose();
                navigate("/account/details");
              }}
            >
              MY ACCOUNT
            </button>

            <button
              type="button"
              className={style.logoutBtn}
              onClick={onLogout}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <form className={style.formModal} onSubmit={onLogin}>
            <div className={style.inputGroup}>
              <label>Email address</label>
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
              <label>Password</label>
              <input
                className={style.modalInput}
                type="password"
                placeholder="Enter your password"
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className={style.errorText}>{error}</p>}

            <button type="submit" className={style.loginBtn} disabled={loading}>
              {loading ? "LOGGING..." : "LOG IN"}
            </button>

            <p className={style.createAcc}>
              No account yet?{" "}
              <Link to="/auth/register" onClick={onClose}>
                Create Account
              </Link>
            </p>
          </form>
        )}
      </aside>
    </>
  );
}
