"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  LifeBuoy,
  Search,
  ChevronRight,
  Mail,
  Phone,
  Bot,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#4facfe]/30 relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.05)_0%,rgba(0,0,0,0)_70%)] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(118,75,162,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[0.7rem] font-bold uppercase tracking-widest text-blue-400 mb-6">
            <LifeBuoy size={12} />
            Support Center
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            How can we help?
          </h1>
          <div className="max-w-2xl mx-auto relative mt-10">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"
              size={20}
            />
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <div className="space-y-16">
          {/* Main Support Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Email */}
            <div className="p-8 rounded-[2rem] bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between h-64 backdrop-blur-md">
              <div>
                <div className="size-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mb-6">
                  <Mail size={22} />
                </div>
                <h4 className="font-bold text-lg mb-2">Email Support</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Have a detailed question? Send us an email and we will get back to you within 24 hours.
                </p>
              </div>
              <a
                href="mailto:support@darsify.com"
                className="text-blue-400 font-semibold text-sm flex items-center gap-2 group-hover:underline mt-4"
              >
                support@darsify.com
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Card 2: Phone */}
            <div className="p-8 rounded-[2rem] bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 group flex flex-col justify-between h-64 backdrop-blur-md">
              <div>
                <div className="size-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-500 flex items-center justify-center mb-6">
                  <Phone size={22} />
                </div>
                <h4 className="font-bold text-lg mb-2">Call Center</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Speak directly with one of our support agents. Mon-Fri, 9am - 6pm EST.
                </p>
              </div>
              <span className="text-purple-400 font-semibold text-sm mt-4">
                +1 (555) 123-4567
              </span>
            </div>

            {/* Card 3: AI Assistant */}
            <div className="p-8 rounded-[2rem] bg-linear-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group flex flex-col justify-between h-64 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-24 h-24 rounded-full bg-blue-500/20 blur-xl"></div>
              <div>
                <div className="size-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-[#00f2fe] flex items-center justify-center mb-6">
                  <Bot size={22} />
                </div>
                <h4 className="font-bold text-lg mb-2">Chat with AI</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Get instant answers to platform navigation, course structures, coding errors, and more.
                </p>
              </div>
              <Link
                href="/ai-assistant"
                className="text-[#00f2fe] font-semibold text-sm flex items-center gap-2 group-hover:underline mt-4 cursor-pointer"
              >
                Launch AI Assistant
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Topics & FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-white/5">
            {/* Left Col: Common Topics */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">
                Common Topics
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Quickly filter documentation or find guides related to these core areas of the platform.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Payments",
                  "Certificates",
                  "Account Setup",
                  "Mobile App",
                  "Instructor Tools",
                ].map((topic) => (
                  <button
                    key={topic}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Col: FAQs */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    q: "How do I download my course completion certificate?",
                    a: "Once you complete 100% of the lessons in a course, navigate to the course dashboard. A 'Download Certificate' button will appear under your progress bar."
                  },
                  {
                    q: "What is your refund policy?",
                    a: "We offer a 30-day money-back guarantee for all courses. If you are not satisfied with a course, you can request a full refund from your Purchase History within 30 days."
                  },
                  {
                    q: "Can I access my courses on mobile?",
                    a: "Yes, you can access the platform on any mobile device via the web browser, or you can download the Darsify mobile app from the App Store or Google Play Store."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/2 border border-white/5 space-y-2">
                    <h4 className="font-bold text-base text-white/90">{faq.q}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
