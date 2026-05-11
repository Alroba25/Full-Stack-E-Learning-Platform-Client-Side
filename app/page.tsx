import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HomeCoursesSeaction from "@/components/HomeCoursesSeaction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 md:px-16 lg:py-24 relative z-10 max-w-[1400px] mx-auto gap-16 lg:gap-0">
        <div className="flex-1 max-w-[600px] text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[0.85rem] text-[#00f2fe] font-semibold mb-6 tracking-widest uppercase">
            🚀 The Future of Learning
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-[-1.5px]">
            Master Future Skills <br />
            with{" "}
            <span className="bg-linear-to-r from-[#ff8a00] to-[#e52e71] bg-clip-text text-transparent">
              Industry Experts
            </span>
          </h1>
          <p className="text-xl text-[#a0a0a0] leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0">
            Unlock your potential with premium, interactive courses designed to
            take your career to the next level. Learn at your own pace from top
            professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
            <Link
              href="/courses"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.2)] transition-all"
            >
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
            <Link
              href="#preview"
              className="bg-transparent text-white border border-white/20 px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/5 hover:border-white/40 transition-all"
            >
              Watch Preview
            </Link>
          </div>

          <div className="flex gap-12 mt-16 justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h4 className="text-3xl font-extrabold mb-1">50k+</h4>
              <p className="text-xs text-[#888] uppercase tracking-wider">
                Active Students
              </p>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-3xl font-extrabold mb-1">200+</h4>
              <p className="text-xs text-[#888] uppercase tracking-wider">
                Premium Courses
              </p>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-3xl font-extrabold mb-1">4.9/5</h4>
              <p className="text-xs text-[#888] uppercase tracking-wider">
                Average Rating
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end relative">
          <Image
            src="/hero.png"
            alt="E-Learning Illustration"
            width={600}
            height={600}
            className="w-full max-w-[600px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float object-cover border border-white/10"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-8 py-24 md:px-16 bg-linear-to-b from-transparent to-[#141414]"
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-16">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white/2 border border-white/5 p-12 rounded-3xl hover:bg-white/5 hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-[#b084f6]">
                💻
              </div>
              <h3 className="text-xl font-bold mb-4">Interactive Coding</h3>
              <p className="text-[#a0a0a0] leading-relaxed text-sm">
                Practice as you learn with our built-in cloud development
                environment. Write code directly in your browser.
              </p>
            </div>
            <div className="bg-white/2 border border-white/5 p-12 rounded-3xl hover:bg-white/5 hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-[#b084f6]">
                🏆
              </div>
              <h3 className="text-xl font-bold mb-4">
                Industry Certifications
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed text-sm">
                Earn verifiable certificates upon completion to showcase your
                new skills to top employers globally.
              </p>
            </div>
            <div className="bg-white/2 border border-white/5 p-12 rounded-3xl hover:bg-white/5 hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-[#b084f6]">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-4">Community Support</h3>
              <p className="text-[#a0a0a0] leading-relaxed text-sm">
                Join thousands of learners on our Discord. Ask questions,
                collaborate on projects, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="px-8 py-24 md:px-16 max-w-[1400px] mx-auto relative z-10"
      >
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-extrabold tracking-tighter">
              Featured Courses
            </h2>
            <p className="text-[#a0a0a0] mt-2 text-lg">
              Hand-picked courses to accelerate your career growth.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-[#00f2fe] font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
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
        {/* Courses Section */}
        <HomeCoursesSeaction />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
