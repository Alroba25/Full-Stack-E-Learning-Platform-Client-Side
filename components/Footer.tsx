import { GraduationCap } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="py-20 px-12 border-t border-white/5 bg-white/1 mt-24">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-white flex items-center justify-center">
            <GraduationCap className="size-6 text-black" />
          </div>
          <span className="text-xl font-black tracking-tighter">DARSIFY</span>
        </div>
        <p className="text-[#555] text-sm">
          &copy; 2026 Darsify. All rights reserved.
        </p>
        <div className="flex gap-8 text-[#555] text-sm font-semibold">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
          <Link href="/support" className="hover:text-white transition-colors">
            Support
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
