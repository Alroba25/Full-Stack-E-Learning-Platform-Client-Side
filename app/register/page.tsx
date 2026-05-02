"use client";
import { registerInputs } from "@/Data";
import { useCallback, useState } from "react";
import { FormState } from "@/Interfaces";
import Link from "next/link";
import styles from "../auth.module.css";
import { SubmitHandler } from "@/Lib";
import { Checkbox } from "@/components/ui/checkbox";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  const handelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (isInstructor) {
        SubmitHandler(e, formData, "/register/instructor");
        setFormData({ name: "", email: "", password: "" });
        return;
      }
      SubmitHandler(e, formData, "/register");
      setFormData({ name: "", email: "", password: "" });
    },
    [formData, isInstructor],
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
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join thousands of learners today</p>

        <form onSubmit={handleSubmit}>
          {registerInputs.map((input) => (
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
                value={formData[input.name as keyof FormState] || ""}
                onChange={handelChange}
              />
            </div>
          ))}
          <div
            className={styles.formGroup}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Checkbox
              id="instructor-checkbox"
              checked={isInstructor}
              onCheckedChange={(checked) => setIsInstructor(checked === true)}
            />
            <label
              htmlFor="instructor-checkbox"
              className={styles.label}
              style={{ marginBottom: 0, cursor: "pointer" }}
            >
              Join as an Instructor
            </label>
          </div>
          <button className={styles.submitBtn} type="submit">
            Register
          </button>
        </form>

        <div className={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
