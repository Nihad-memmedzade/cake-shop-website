import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { registerThunk } from "@/store/authSlice";

export default function Register() {
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
      setFormError("Password must be at least 6 characters.");
      return;
    }

    if (confirmPassword.length < 6) {
      setFormError("Confirm password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    const result = await dispatch(
      registerThunk({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      })
    );

    if (registerThunk.fulfilled.match(result)) {
      navigate("/account/details");
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>REGISTER</h1>
            <p className={style.subtitle}>
              Create your account to enjoy our sweets
            </p>
          </header>

          <form className={style.form} onSubmit={handleRegister}>
            <div className={style.field}>
              <input
                className={style.input}
                type="text"
                placeholder="Full name *"
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
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={style.field}>
              <input
                className={style.input}
                type="password"
                placeholder="Password *"
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
                placeholder="Confirm password *"
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
                <span>I agree to the Terms & Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>

            <p className={style.bottomText}>
              Already have an account?
              <Link to="/auth/login">
                <button type="button" className={style.inlineBtn}>
                  Log in
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
