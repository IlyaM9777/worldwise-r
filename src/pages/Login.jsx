import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useLogin } from "../components/useLogin";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isPending}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isPending}
          />
        </div>

        <div>
          <Button type="primary" disabled={isPending}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
