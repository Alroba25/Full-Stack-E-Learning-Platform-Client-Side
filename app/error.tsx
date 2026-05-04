"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>
      
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 z-10 text-center">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl relative">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">
          Something went wrong!
        </h1>
        <p className="text-[#a0a0a0] max-w-lg mb-10 text-lg leading-relaxed">
          We hit a snag while trying to load this page. Don't worry, it's not your fault. Let's try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-black font-extrabold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(79,172,254,0.5)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <Home size={20} />
            <span>Return Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
