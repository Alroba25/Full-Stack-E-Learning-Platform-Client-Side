"use client";
import Link from "next/link";
import {
  getNotifications,
  getToken,
  markAllNotificationsAsRead,
  removeToken,
} from "@/Lib";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  BookOpen,
  GraduationCap,
  Sparkles,
  ShoppingCart,
  Bell,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import DropDownNotification from "./DropDownNotification";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetchNotification = async () => {
    const data = await getNotifications();
    if (data) {
      setNotification(data.notifications);
    }
  };
  useEffect(() => {
    const markRead = async () => {
      if (open && notification.some((n: any) => !n.isRead)) {
        await markAllNotificationsAsRead();
        fetchNotification();
      }
    };
    markRead();
  }, [open]);
  useEffect(() => {
    setToken(getToken());
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (token) {
      fetchNotification();
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
    ...(token
      ? [{ name: "My Courses", href: "/my-courses", icon: GraduationCap }]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-100 bg-[#050505] backdrop-blur-none flex items-center justify-between px-6 py-4 md:px-16 border-b border-white/5 transition-all">
      <Link href="/" className="relative hover:opacity-90 transition-opacity">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-14 md:h-16 w-auto object-contain"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`group flex items-center gap-2 py-2 px-3.5 rounded-xl transition-all duration-300 hover:bg-white/5 ${isActive ? "bg-white/5 text-white" : "text-[#a0a0a0] hover:text-white"}`}
            >
              <Icon
                className={`size-4.5 transition-colors duration-300 ${isActive ? "text-[#00f2fe]" : "text-[#a0a0a0] group-hover:text-[#00f2fe]"}`}
              />
              <span className="font-semibold text-sm tracking-wide">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Header Actions (Right) */}
      <div className="flex items-center gap-2 md:gap-4">
       {/* { Cart Button}
        <Link
          href="/cart"
          className={`relative p-2.5 rounded-xl transition-all active:scale-95 hover:bg-white/5 ${pathname === "/cart" ? "text-white bg-white/5" : "text-[#a0a0a0] hover:text-white"}`}
        >
          <ShoppingCart className="size-5" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-blue-500 text-[10px] font-black text-white border border-[#050505]"></span>
        </Link> */}

        {/* Notifications Button */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer relative p-2.5 rounded-xl transition-all active:scale-95 hover:bg-white/5 text-[#a0a0a0] hover:text-white"
          >
            <Bell className="size-5" />

            {notification?.filter((n: any) => !n.isRead).length > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </button>
          <DropDownNotification
            notifications={notification}
            open={open}
            dropdownRef={dropdownRef}
          />
        </div>

        {/* Auth / Profile Actions */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <Link
                href="/profile"
                className={`flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-[#a0a0a0] hover:text-white transition-all active:scale-95 ${pathname === "/profile" ? "text-white bg-white/5" : ""}`}
              >
                <UserRound className="size-5" />
              </Link>
              <button
                onClick={() => {
                  removeToken();
                  setToken(null);
                  router.push("/login");
                }}
                className="flex items-center gap-2 py-2 px-4 rounded-xl border border-red-500/30 hover:border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-sm transition-all duration-300 cursor-pointer active:scale-95"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 py-2 px-4 text-white/80 hover:text-white font-semibold text-sm transition-all hover:bg-white/5 rounded-xl"
              >
                <LogIn className="size-4 text-[#00f2fe]" />
                <span>Log In</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 bg-linear-to-br from-[#667eea] to-[#764ba2] hover:shadow-[0_4px_15px_rgba(118,75,162,0.3)] px-5 py-2.5 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 transition-all"
              >
                <UserPlus className="size-4" />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl hover:bg-white/5 text-[#a0a0a0] hover:text-white transition-all active:scale-95"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bottom-0 z-9999 bg-[#050505]/85 backdrop-blur-xl flex flex-col p-6">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all ${isActive ? "bg-white/10 text-white" : "text-[#a0a0a0] hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon className="size-5" />
                  <span className="font-semibold text-lg">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-white/5 my-2"></div>

          <div className="flex flex-col gap-4">
            {token ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all ${pathname === "/profile" ? "bg-white/10 text-white" : "text-[#a0a0a0] hover:bg-white/5 hover:text-white"}`}
                >
                  <UserRound className="size-5" />
                  <span className="font-semibold text-lg">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    removeToken();
                    setToken(null);
                    router.push("/login");
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left"
                >
                  <LogOut className="size-5" />
                  <span className="font-semibold text-lg">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold hover:bg-white/5 transition-all border border-white/10"
                >
                  <LogIn className="size-5 text-[#00f2fe]" />
                  <span>Log In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-linear-to-br from-[#667eea] to-[#764ba2] py-3.5 rounded-xl text-white font-bold transition-all shadow-[0_4px_15px_rgba(118,75,162,0.3)]"
                >
                  <UserPlus className="size-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
