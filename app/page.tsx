import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background glow effects */}
      <div className={styles.glowBackground}></div>
      <div className={styles.glowBackground2}></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>🚀 The Future of Learning</div>
          <h1 className={styles.title}>
            Master Future Skills <br />
            with <span className={styles.highlight}>Industry Experts</span>
          </h1>
          <p className={styles.subtitle}>
            Unlock your potential with premium, interactive courses designed to
            take your career to the next level. Learn at your own pace from top
            professionals.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#courses" className={styles.primaryCta}>
              Explore Courses
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#preview" className={styles.secondaryCta}>
              Watch Preview
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h4>50k+</h4>
              <p>Active Students</p>
            </div>
            <div className={styles.statItem}>
              <h4>200+</h4>
              <p>Premium Courses</p>
            </div>
            <div className={styles.statItem}>
              <h4>4.9/5</h4>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        <div className={styles.heroImageContainer}>
          <Image
            src="/hero.png"
            alt="E-Learning Illustration"
            width={600}
            height={600}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.featuresInner}>
          <h2 className={styles.featuresTitle}>Why Choose Our Platform</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💻</div>
              <h3>Interactive Coding</h3>
              <p>
                Practice as you learn with our built-in cloud development
                environment. Write code directly in your browser.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Industry Certifications</h3>
              <p>
                Earn verifiable certificates upon completion to showcase your
                new skills to top employers globally.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>Community Support</h3>
              <p>
                Join thousands of learners on our Discord. Ask questions,
                collaborate on projects, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Courses</h2>
            <p className={styles.sectionSubtitle}>
              Hand-picked courses to accelerate your career growth.
            </p>
          </div>
          <Link href="/courses" className={styles.viewAll}>
            View All Courses
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.courseGrid}>
          {/* Course 1 */}
          <div className={styles.courseCard}>
            <div className={styles.courseImageWrapper}>
              <span className={styles.courseCategory}>Web Development</span>
              <Image
                src="/course-react.png"
                alt="Advanced React patterns"
                fill
                className={styles.courseImage}
              />
            </div>
            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>
                Advanced React & Next.js Ecosystem
              </h3>
              <div className={styles.courseInstructor}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Sarah Drasner
              </div>
              <div className={styles.courseFooter}>
                <div className={styles.courseMeta}>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    24h
                  </div>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    4.9
                  </div>
                </div>
                <div className={styles.coursePrice}>$99</div>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className={styles.courseCard}>
            <div className={styles.courseImageWrapper}>
              <span className={styles.courseCategory}>Business</span>
              <Image
                src="/course-business.png"
                alt="Digital Marketing"
                fill
                className={styles.courseImage}
              />
            </div>
            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>
                Digital Marketing Masterclass
              </h3>
              <div className={styles.courseInstructor}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Michael Chen
              </div>
              <div className={styles.courseFooter}>
                <div className={styles.courseMeta}>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    18h
                  </div>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    4.8
                  </div>
                </div>
                <div className={styles.coursePrice}>$79</div>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className={styles.courseCard}>
            <div className={styles.courseImageWrapper}>
              <span className={styles.courseCategory}>Design</span>
              <Image
                src="/hero.png"
                alt="UI/UX Design"
                fill
                className={styles.courseImage}
              />
            </div>
            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>
                Modern UI/UX Design Systems
              </h3>
              <div className={styles.courseInstructor}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Elena Rodriguez
              </div>
              <div className={styles.courseFooter}>
                <div className={styles.courseMeta}>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    32h
                  </div>
                  <div className={styles.courseMetaItem}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    5.0
                  </div>
                </div>
                <div className={styles.coursePrice}>$129</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Footer */}
      <footer
        style={{
          padding: "4rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "#888",
          marginTop: "4rem",
        }}
      >
        <p>&copy; 2026 E-Platform Learning. All rights reserved.</p>
      </footer>
    </div>
  );
}
