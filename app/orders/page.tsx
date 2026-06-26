"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  Filter,
  TrendingUp,
  Package,
  Star,
  BookOpen,
  RefreshCw,
  ArrowUpRight,
  Smartphone,
  CreditCard,
  Wallet,
  ArrowLeft,
} from "lucide-react";

// ─── Static Data ─────────────────────────────────────────────────────────────

type OrderStatus = "completed" | "pending" | "cancelled";
type PaymentMethod = "vodafone" | "instapay" | "fawry" | "card";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  course: {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    category: string;
    rating: number;
    totalLessons: number;
  };
  amount: number;
  transactionId: string;
}

const STATIC_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "DRS-2026-00147",
    date: "2026-06-20T10:34:00Z",
    status: "completed",
    paymentMethod: "vodafone",
    course: {
      id: "c1",
      title: "Complete Next.js & React Mastery — Build Modern Web Apps",
      instructor: "Ahmed Khaled",
      thumbnail: "",
      category: "Web Development",
      rating: 4.9,
      totalLessons: 148,
    },
    amount: 299,
    transactionId: "TXN-9A3F2C71",
  },
  {
    id: "2",
    orderNumber: "DRS-2026-00138",
    date: "2026-06-14T15:10:00Z",
    status: "completed",
    paymentMethod: "instapay",
    course: {
      id: "c2",
      title: "UI/UX Design Fundamentals with Figma — Zero to Pro",
      instructor: "Sara Hassan",
      thumbnail: "",
      category: "Design",
      rating: 4.8,
      totalLessons: 96,
    },
    amount: 199,
    transactionId: "TXN-5B8D1A42",
  },
  {
    id: "3",
    orderNumber: "DRS-2026-00129",
    date: "2026-06-05T08:20:00Z",
    status: "pending",
    paymentMethod: "fawry",
    course: {
      id: "c3",
      title: "Python for Data Science & Machine Learning Bootcamp",
      instructor: "Omar Farouk",
      thumbnail: "",
      category: "Data Science",
      rating: 4.7,
      totalLessons: 210,
    },
    amount: 349,
    transactionId: "TXN-2E7K9M88",
  },
  {
    id: "5",
    orderNumber: "DRS-2026-00098",
    date: "2026-05-18T09:05:00Z",
    status: "cancelled",
    paymentMethod: "card",
    course: {
      id: "c5",
      title: "Digital Marketing Mastery — SEO, Ads & Social Media",
      instructor: "Nada Mostafa",
      thumbnail: "",
      category: "Marketing",
      rating: 4.5,
      totalLessons: 88,
    },
    amount: 179,
    transactionId: "TXN-3A1R5Q22",
  },
  {
    id: "6",
    orderNumber: "DRS-2026-00082",
    date: "2026-05-01T16:00:00Z",
    status: "completed",
    paymentMethod: "instapay",
    course: {
      id: "c6",
      title: "Advanced TypeScript — Patterns, Generics & Architecture",
      instructor: "Kareem Salah",
      thumbnail: "",
      category: "Web Development",
      rating: 4.9,
      totalLessons: 124,
    },
    amount: 229,
    transactionId: "TXN-6D9W2X14",
  },
];

// ─── Helper Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
};

const PAYMENT_CONFIG: Record<
  PaymentMethod,
  { label: string; icon: React.ElementType; color: string }
> = {
  vodafone: { label: "Vodafone Cash", icon: Smartphone, color: "#e60026" },
  instapay: { label: "InstaPay", icon: ArrowUpRight, color: "#00b4d8" },
  fawry: { label: "Fawry", icon: Wallet, color: "#f5a623" },
  card: { label: "Credit Card", icon: CreditCard, color: "#667eea" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Web Development": "#4facfe",
  Design: "#f093fb",
  "Data Science": "#43e97b",
  Backend: "#f5a623",
  Marketing: "#fa709a",
};

const ALL_STATUSES: ("all" | OrderStatus)[] = [
  "all",
  "completed",
  "pending",
  "cancelled",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accentColor,
  glowColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accentColor: string;
  glowColor: string;
}) {
  return (
    <div className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-6 transition-all duration-300 overflow-hidden cursor-default">
      {/* Subtle glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center border"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}30`,
          }}
        >
          <Icon size={20} style={{ color: accentColor }} />
        </div>
        <span className="text-3xl font-black text-white">{value}</span>
      </div>
      <p className="text-sm font-semibold text-[#d1d7dc]">{label}</p>
      {sub && <p className="text-xs text-[#666] mt-1">{sub}</p>}
    </div>
  );
}

function CourseAvatar({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const color = CATEGORY_COLORS[category] || "#888";
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black text-white border"
      style={{ backgroundColor: `${color}18`, borderColor: `${color}30` }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PaymentBadge({ method }: { method: PaymentMethod }) {
  const cfg = PAYMENT_CONFIG[method];
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold"
      style={{ color: cfg.color }}
    >
      <Icon size={12} />
      {cfg.label}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Stats derived from static data
  const totalSpent = STATIC_ORDERS.reduce(
    (s, o) => (o.status !== "cancelled" ? s + o.amount : s),
    0,
  );
  const completedCount = STATIC_ORDERS.filter(
    (o) => o.status === "completed",
  ).length;
  const pendingCount = STATIC_ORDERS.filter(
    (o) => o.status === "pending",
  ).length;

  // Filtered orders
  const filtered = useMemo(() => {
    return STATIC_ORDERS.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesStatus;
    });
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-[#4facfe]/30">
      {/* Background glows */}
      <div className="absolute top-0 left-[-15%] w-[55vw] h-[55vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.06)_0%,rgba(0,0,0,0)_70%)]" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(164,53,240,0.07)_0%,rgba(0,0,0,0)_70%)]" />
      <div className="absolute bottom-[5%] left-[30%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(67,233,123,0.04)_0%,rgba(0,0,0,0)_70%)]" />

      <Navbar />

      <main className="grow z-10 w-full max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col gap-10">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#4facfe]/15 border border-[#4facfe]/25 flex items-center justify-center">
                <ShoppingBag size={20} className="text-[#4facfe]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4facfe]">
                Order History
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              My Orders
            </h1>
            <p className="text-[#888] mt-2 text-base">
              Track all your purchases and payment activity in one place.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="text-[#a0a0a0] font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors z-20"
            >
              <ArrowLeft />
              Back to Profile
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-black font-extrabold px-5 py-3 rounded-xl hover:shadow-[0_0_24px_rgba(79,172,254,0.4)] transition-all hover:-translate-y-0.5 active:scale-[0.98] text-sm"
            >
              <BookOpen size={16} />
              Explore Courses
            </Link>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Package}
            label="Total Orders"
            value={STATIC_ORDERS.length}
            sub="All time"
            accentColor="#4facfe"
            glowColor="#4facfe40"
          />
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={completedCount}
            sub="Successfully enrolled"
            accentColor="#a435f0"
            glowColor="#a435f040"
          />
          <StatCard
            icon={Clock}
            label="In Progress"
            value={pendingCount}
            sub="Awaiting confirmation"
            accentColor="#f5a623"
            glowColor="#f5a62340"
          />
        </div>

        {/* ── Filters & Search ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 overflow-x-auto scrollbar-hide">
            <Filter size={14} className="text-[#555] ml-1.5 mr-0.5 shrink-0" />
            {ALL_STATUSES.map((s) => {
              const active = statusFilter === s;
              const cfg = s !== "all" ? STATUS_CONFIG[s] : null;
              return (
                <button
                  key={s}
                  id={`filter-${s}`}
                  onClick={() => setStatusFilter(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${
                    active
                      ? "bg-[#4facfe]/20 text-[#4facfe] border border-[#4facfe]/30"
                      : "text-[#666] hover:text-[#aaa]"
                  }`}
                >
                  {s === "all" ? (
                    "All"
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${cfg?.dot}`}
                      />
                      {cfg?.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* ── Orders List ── */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#444]" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">No orders found</p>
                <p className="text-[#555] text-sm mt-1">
                  Try adjusting your search or filter.
                </p>
              </div>
            </div>
          ) : (
            filtered.map((order) => {
              const isExpanded = expandedOrder === order.id;
              const statusCfg = STATUS_CONFIG[order.status];
              const paymentCfg = PAYMENT_CONFIG[order.paymentMethod];
              const categoryColor =
                CATEGORY_COLORS[order.course.category] || "#888";
              const formattedDate = new Date(order.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <div
                  key={order.id}
                  className={`group bg-white/[0.03] border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-white/[0.15] shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                      : "border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.05]"
                  }`}
                >
                  {/* ── Card Header ── */}
                  <button
                    id={`order-toggle-${order.id}`}
                    className="w-full text-left p-5 md:p-6"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Course avatar + info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <CourseAvatar
                          title={order.course.title}
                          category={order.course.category}
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-white text-sm md:text-base line-clamp-1 group-hover:text-[#4facfe] transition-colors">
                            {order.course.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-[#666]">
                              by{" "}
                              <span className="text-[#999]">
                                {order.course.instructor}
                              </span>
                            </span>
                            <span
                              className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide"
                              style={{
                                color: categoryColor,
                                backgroundColor: `${categoryColor}14`,
                                borderColor: `${categoryColor}28`,
                              }}
                            >
                              {order.course.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 sm:gap-6 shrink-0 flex-wrap">
                        {/* Amount */}
                        <div className="text-right">
                          <p className="text-xl font-black text-white">
                            ${order.amount}
                          </p>
                          <p className="text-[0.65rem] text-[#555] font-medium mt-0.5">
                            {order.orderNumber}
                          </p>
                        </div>

                        {/* Status */}
                        <StatusBadge status={order.status} />

                        {/* Chevron */}
                        <div
                          className={`w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center transition-transform duration-300 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        >
                          <ChevronRight size={14} className="text-[#666]" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* ── Expanded Detail Panel ── */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] px-5 md:px-6 py-6 bg-black/20 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Order Date */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Order Date
                          </p>
                          <p className="text-sm font-semibold text-[#ccc]">
                            {formattedDate}
                          </p>
                        </div>

                        {/* Transaction ID */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Transaction ID
                          </p>
                          <p className="text-sm font-mono text-[#ccc]">
                            {order.transactionId}
                          </p>
                        </div>

                        {/* Payment Method */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Payment
                          </p>
                          <PaymentBadge method={order.paymentMethod} />
                        </div>

                        {/* Course Stats */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Course Info
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-[#888]">
                              <BookOpen size={12} className="text-[#4facfe]" />
                              {order.course.totalLessons} lessons
                            </span>
                            <span className="flex items-center gap-1 text-xs text-[#888]">
                              <Star
                                size={12}
                                className="text-amber-400 fill-amber-400"
                              />
                              {order.course.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ── Summary Banner ── */}
        {filtered.length > 0 && (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a435f0]/15 border border-[#a435f0]/25 flex items-center justify-center">
                <TrendingUp size={18} className="text-[#a435f0]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Showing {filtered.length} of {STATIC_ORDERS.length} orders
                </p>
                <p className="text-xs text-[#555] mt-0.5">
                  Your learning investment is paying off — keep it up!
                </p>
              </div>
            </div>
            <Link
              href="/my-courses"
              className="inline-flex items-center gap-2 text-[#a435f0] hover:text-[#c96bff] font-bold text-sm transition-colors"
            >
              View My Courses <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
