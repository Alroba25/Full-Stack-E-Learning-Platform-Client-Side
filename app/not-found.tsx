import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(164,53,240,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center z-10 text-center">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-linear-to-r from-[#00f2fe] to-[#4facfe] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl relative">
            <Compass
              size={64}
              className="text-[#4facfe] animate-[spin_10s_linear_infinite]"
            />
          </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Looks like you're lost in cyberspace
        </h2>
        <p className="text-[#a0a0a0] max-w-lg mb-10 text-lg leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or is
          temporarily unavailable. Let's get you back on track.
        </p>

        <Link
          href="/"
          className="cursor-pointer group flex items-center gap-2 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-black font-extrabold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(79,172,254,0.5)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <Home size={20} />
          <span>Return Home</span>
        </Link>
      </main>
    </div>
  );
}
