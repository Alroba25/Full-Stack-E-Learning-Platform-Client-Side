"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#4facfe]/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white/80">Privacy Policy</span>
        </nav>

        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[0.7rem] font-bold uppercase tracking-widest text-blue-400 mb-6">
            <Shield size={12} />
            Security First
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Privacy Policy.
          </h1>
          <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
            Your privacy is paramount. This policy explains how we handle your data with transparency and care.
          </p>
        </header>

        <div className="space-y-16">
          <section className="relative group">
            <div className="absolute -left-8 top-1 hidden md:flex size-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <span className="text-[10px] font-bold text-white/40">01</span>
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Eye className="text-blue-500" size={24} />
              Information Collection
            </h2>
            <div className="prose prose-invert max-w-none text-white/60 leading-loose">
              <p>
                We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This includes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 list-none p-0">
                {[
                  "Account credentials (email, name, password)",
                  "Profile information and avatars",
                  "Course progress and completion data",
                  "Payment information (processed securely)",
                  "Technical log data and IP addresses",
                  "Communication history with support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                    <div className="size-1.5 rounded-full bg-blue-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="relative group">
            <div className="absolute -left-8 top-1 hidden md:flex size-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <span className="text-[10px] font-bold text-white/40">02</span>
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Lock className="text-purple-500" size={24} />
              Data Security
            </h2>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Shield size={120} />
               </div>
              <p className="text-white/60 leading-loose relative z-10">
                We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption (AES-256) and secure socket layer (SSL) technology to protect your sensitive data during transmission and at rest.
              </p>
            </div>
          </section>

          <section className="relative group">
            <div className="absolute -left-8 top-1 hidden md:flex size-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <span className="text-[10px] font-bold text-white/40">03</span>
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-emerald-500" size={24} />
              Your Rights
            </h2>
            <div className="prose prose-invert max-w-none text-white/60 leading-loose">
              <p>
                You have the right to access, correct, or delete your personal data. You can manage your account settings or contact our support team for any data-related requests.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-32 p-12 rounded-[3rem] bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h3 className="text-3xl font-bold mb-6">Questions about privacy?</h3>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Our data protection officer is available to answer any questions you may have regarding your data.
          </p>
          <Link href="/support" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-black hover:bg-white/90 transition-all shadow-xl active:scale-95">
            Contact Support
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
