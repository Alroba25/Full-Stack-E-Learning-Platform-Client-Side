"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gavel, CheckCircle2, AlertCircle, Scale, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#4facfe]/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white/80">Terms of Use</span>
        </nav>

        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[0.7rem] font-bold uppercase tracking-widest text-purple-400 mb-6">
            <Scale size={12} />
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Terms of Use.
          </h1>
          <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
            Please read these terms carefully before using our platform. By accessing Darsify, you agree to be bound by these terms.
          </p>
        </header>

        <div className="space-y-16">
          <section className="relative group">
            <div className="absolute -left-8 top-1 hidden md:flex size-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <span className="text-[10px] font-bold text-white/40">01</span>
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={24} />
              User Responsibilities
            </h2>
            <div className="prose prose-invert max-w-none text-white/60 leading-loose">
              <p>
                When using Darsify, you agree to:
              </p>
              <ul className="grid grid-cols-1 gap-4 mt-6 list-none p-0">
                {[
                  "Provide accurate and complete registration information",
                  "Keep your account credentials secure and confidential",
                  "Use the platform only for lawful and educational purposes",
                  "Respect the intellectual property rights of course creators",
                  "Refrain from sharing your account with others"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
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
              <AlertCircle className="text-amber-500" size={24} />
              Prohibited Content
            </h2>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-white/60 leading-loose">
                You may not post or share any content that is discriminatory, hateful, violent, or infringing upon others' rights. We reserve the right to remove any content and terminate accounts that violate these guidelines without prior notice.
              </p>
            </div>
          </section>

          <section className="relative group">
            <div className="absolute -left-8 top-1 hidden md:flex size-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
              <span className="text-[10px] font-bold text-white/40">03</span>
            </div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Gavel className="text-blue-500" size={24} />
              Dispute Resolution
            </h2>
            <div className="prose prose-invert max-w-none text-white/60 leading-loose">
              <p>
                Any disputes arising from these terms will be settled through arbitration in accordance with local laws. We encourage users to contact our support team first to resolve any issues amicably.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-32 p-1 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between gap-8 items-center">
           <div className="text-white/30 text-sm">
              Last updated: October 2026
           </div>
           <div className="flex gap-6">
              <Link href="/privacy" className="text-white/50 hover:text-white transition-colors text-sm font-semibold">Privacy Policy</Link>
              <Link href="/support" className="text-white/50 hover:text-white transition-colors text-sm font-semibold">Contact Support</Link>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
