"use client";
import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Package,
  Star,
  BookOpen,
  ArrowLeft,
  ShieldX,
} from "lucide-react";
import { getStudentOrders } from "@/Lib";
import PaymentBadge from "@/components/PaymentPage";
import { OrderStatus } from "@/Interfaces";
import StatusBadge from "@/components/StatusBageOrder";
import StatCard from "@/components/StateCardOrder";
const CATEGORY_COLORS: Record<string, string> = {
  "Web Development": "#4facfe",
  Design: "#f093fb",
  "Data Science": "#43e97b",
  Backend: "#f5a623",
  Marketing: "#fa709a",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  // Get Orders Handelar
  const fetchData = async () => {
    try {
      const data = await getStudentOrders();
      const { payments } = data;
      if (payments?.length > 0) {
        setOrders(payments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            icon={<Package size={20} style={{ color: "#4facfe" }} />}
            label="Total Orders"
            value={orders?.length}
            sub="All time"
            accentColor="#4facfe"
            glowColor="#4facfe40"
          />
          <StatCard
            icon={<CheckCircle2 size={20} style={{ color: "#4facfe" }} />}
            label="Approved"
            value={
              orders.filter((order: any) => order.status === "approved")?.length
            }
            sub="Successfully enrolled"
            accentColor="#a435f0"
            glowColor="#a435f040"
          />
          <StatCard
            icon={<Clock size={20} style={{ color: "#4facfe" }} />}
            label="In Progress"
            value={
              orders.filter((order: any) => order.status === "pending")?.length
            }
            sub="Awaiting confirmation"
            accentColor="#f5a623"
            glowColor="#f5a62340"
          />
          <StatCard
            icon={<ShieldX size={20} style={{ color: "#ff0000" }} />}
            label="Rejected"
            value={
              orders.filter((order: any) => order.status === "rejected")?.length
            }
            sub=""
            accentColor="#ff0000"
            glowColor="#ff000040"
          />
        </div>
        {/* ── Orders List ── */}
        <div className="flex flex-col gap-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#444]" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">No orders found</p>
                {/* <p className="text-[#555] text-sm mt-1">
                  Try adjusting your search or filter.
                </p> */}
              </div>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrder === order?._id;
              const categoryColor =
                CATEGORY_COLORS[order?.course?.category] || "#888";
              const formattedDate = new Date(
                order?.createdAt,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={order?._id}
                  className={`group bg-white/3 border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                      : "border-white/7 hover:border-white/12 hover:bg-white/5"
                  }`}
                >
                  {/* ── Card Header ── */}
                  <button
                    id={`order-toggle-${order?._id}`}
                    className="w-full text-left p-5 md:p-6"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order?._id)
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Course avatar + info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {order.course?.imageUrl ? (
                          <img
                            src={order?.course?.imageUrl}
                            alt={order?.course?.title}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        ) : (
                          <img
                            src="/Darsfiy-cover-course.png"
                            alt={order?.course?.title}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-white text-sm md:text-base line-clamp-1 group-hover:text-[#4facfe] transition-colors">
                            {order?.course?.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-[#666]">
                              by{" "}
                              <span className="text-[#999]">
                                {order?.course?.instructor?.name}
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
                              {order?.course?.category?.length > 0
                                ? order?.course?.category
                                : "No Category"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 sm:gap-6 shrink-0 flex-wrap">
                        {/* Amount */}
                        <div className="text-right">
                          <p className="text-[0.65rem] text-[#555] font-medium mt-0.5">
                            ${order?.course?.price}
                          </p>
                        </div>

                        {/* Status */}
                        <StatusBadge status={order?.status} />

                        {/* Chevron */}
                        <div
                          className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${
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
                    <div className="border-t border-white/6 px-5 md:px-6 py-6 bg-black/20 animate-in fade-in slide-in-from-top-3 duration-200">
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

                        {/* Phone Number */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Phone Number
                          </p>
                          <p className="text-sm font-semibold text-[#ccc]">
                            {order?.phoneNumber}
                          </p>
                        </div>

                        {/* Payment Method */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Payment Method
                          </p>

                          <PaymentBadge method={order?.paymentMethod} />
                        </div>

                        {/* Course Info */}
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-widest text-[#555] font-bold mb-1.5">
                            Course Info
                          </p>

                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-[#888]">
                              <BookOpen size={12} className="text-[#4facfe]" />
                              {order?.course?.lessonsCount} Lessons
                            </span>

                            <span className="flex items-center gap-1 text-xs text-[#888]">
                              <Star
                                size={12}
                                className="text-amber-400 fill-amber-400"
                              />
                              {order?.course?.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      {order?.status === "rejected" && (
                        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                          <p className="text-red-400 text-sm font-semibold">
                            Your payment was rejected.
                          </p>
                          <p className="text-xs text-red-300/70 mt-1">
                            Please upload a new payment proof and submit another
                            order.
                          </p>
                        </div>
                      )}
                      {order?.status === "pending" && (
                        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                          <p className="text-amber-400 text-sm font-semibold">
                            Your payment is under review.
                          </p>
                          <p className="text-xs text-amber-300/70 mt-1">
                            The admin will review your payment shortly.
                          </p>
                        </div>
                      )}
                      {order?.status === "approved" && (
                        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center justify-between">
                          <div>
                            <p className="text-emerald-400 text-sm font-semibold">
                              Payment Approved 🎉
                            </p>
                            <p className="text-xs text-emerald-300/70 mt-1">
                              This course has been added to your My Courses.
                            </p>
                          </div>

                          <Link
                            href={`/courses/${order?.course?._id}`}
                            className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition"
                          >
                            Go To Course
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ── Summary Banner ── */}
        {orders?.length > 0 && (
          <div className="bg-white/2 border border-white/6 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a435f0]/15 border border-[#a435f0]/25 flex items-center justify-center">
                <TrendingUp size={18} className="text-[#a435f0]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Showing {orders?.length} of {orders?.length} orders
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
