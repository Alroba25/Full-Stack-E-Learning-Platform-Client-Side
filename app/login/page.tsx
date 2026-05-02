"use client";
import { loginInputs } from "@/Data";
import { useCallback, useState } from "react";
import { LoginState } from "@/Interfaces";
import Link from "next/link";
import styles from "../auth.module.css";
import { SubmitHandler } from "@/Lib";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      SubmitHandler(e, formData, "/login");
      setFormData({ email: "", password: "" });
    },
    [formData],
  );

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      <div className={styles.glowBackground2}></div>

      <Link href="/" className={styles.backLink}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className={styles.authCard}>
        <div className={styles.logo}>E-Platform</div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to access your courses</p>

        <form onSubmit={handleSubmit}>
          {loginInputs.map((input) => (
            <div key={input.id} className={styles.formGroup}>
              <label htmlFor={input.id} className={styles.label}>
                {input.label}
              </label>
              <input
                className={styles.input}
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof LoginState] || ""}
                onChange={handelChange}
              />
            </div>
          ))}
          <button className={styles.submitBtn} type="submit">
            Login
          </button>
        </form>

        <div className={styles.footerText}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
