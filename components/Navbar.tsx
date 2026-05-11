"use client";
import Link from "next/link";
import { getToken, removeToken } from "@/Lib";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setToken(getToken());
  }, [token]);

  const navLinks = [{ name: "Courses", href: "/courses" }];

  return (
    <nav className="sticky top-0 z-100 flex items-center justify-between px-8 py-6 md:px-16 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5">
      <Link
        href="/"
        className="text-2xl font-heading font-extrabold bg-linear-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-tighter hover:opacity-80 transition-opacity"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="h-18 w-auto object-contain"
        />
      </Link>

      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="relative group flex items-center py-1"
            >
              <span
                className={`font-medium text-[0.95rem] transition-colors ${isActive ? "text-white" : "text-[#a0a0a0] group-hover:text-white"}`}
              >
                {link.name}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
          );
        })}

        {token && (
          <Link
            href="/my-courses"
            className="relative group flex items-center py-1"
          >
            <span
              className={`font-bold text-[0.95rem] transition-colors ${pathname === "/my-courses" ? "text-[#4facfe]" : "text-white group-hover:text-[#4facfe]"}`}
            >
              My Courses
            </span>
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-300 ${pathname === "/my-courses" ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-8">
        {token ? (
          <div className="flex gap-5 items-center">
            <Link href="/profile" className="relative group flex items-center">
              <UserRound className="mb-2 h-6 w-6 text-[#a0a0a0] group-hover:text-white transition-colors" />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-300 ${pathname === "/profile" ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
            <button
              onClick={() => {
                removeToken();
                setToken(null);
                router.push("/login");
              }}
              className="relative group flex items-center py-1 text-white font-semibold text-[0.95rem] hover:text-[#00f2fe] transition-colors cursor-pointer"
            >
              Logout
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#f87171] to-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="relative group flex items-center py-1 text-white font-semibold text-[0.95rem] hover:text-[#00f2fe] transition-colors"
            >
              Log In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/register"
              className="bg-linear-to-br from-[#667eea] to-[#764ba2] px-6 py-2.5 rounded-full text-white font-semibold hover:scale-105 hover:shadow-[0_4px_15px_rgba(118,75,162,0.4)] transition-all"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
