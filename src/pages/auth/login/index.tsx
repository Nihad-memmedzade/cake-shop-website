import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Layout from "@/assets/components/layout";
import style from "./../auth.module.scss";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { loginThunk } from "@/store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      loginThunk({
        email,
        password,
      })
    );

    if (loginThunk.fulfilled.match(result)) {
      navigate("/account/details");
    }
  };

  return (
    <Layout>
      <div className={style.pageCenter}>
        <div className={style.card}>
          <header className={style.header}>
            <h1 className={style.title}>LOGIN</h1>
            <p className={style.subtitle}>
              Welcome back! Please enter your details.
            </p>
          </header>

          <form className={style.form} onSubmit={handleLogin}>
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
                required
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className={style.row}>
              <label className={style.remember}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a className={style.link} href="/">
                Lost password?
              </a>
            </div>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>

            <p className={style.bottomText}>
              No account yet?
              <Link to="/auth/register">
                <button type="button" className={style.inlineBtn}>
                  Create Account
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}