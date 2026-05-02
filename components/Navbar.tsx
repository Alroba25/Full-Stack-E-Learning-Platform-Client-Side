import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>E-Platform</div>
      <div className={styles.navLinks}>
        <Link href="#courses" className={styles.navLink}>
          Courses
        </Link>
        <Link href="#features" className={styles.navLink}>
          Features
        </Link>
        <Link href="#pricing" className={styles.navLink}>
          Pricing
        </Link>
        <Link href="#about" className={styles.navLink}>
          About
        </Link>
      </div>
      <div className={styles.navActions}>
        <Link href="/login" className={styles.loginBtn}>
          Log In
        </Link>
        <Link href="/register" className={styles.signupBtn}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
