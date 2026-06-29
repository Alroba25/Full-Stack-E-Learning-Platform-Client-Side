"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  Trash2,
  ShieldCheck,
  ShieldOff,
  CheckCircle2,
  XCircle,
  Bell,
  ArrowLeft,
  Star,
  BarChart3,
  GraduationCap,
  CreditCard,
  Clock,
  Eye,
  RefreshCw,
  Mail,
  Calendar,
  BookMarked,
  Image,
} from "lucide-react";
import {
  adminApprovePayment,
  adminRejectPayment,
  deleteCourseByAdmin,
  deleteUserByAdmin,
  getAdminAllPayments,
  getAllCourses,
  getAllUsersByAdmin,
  getNotifications,
  markAllNotificationsAsRead,
  toggleUserAdmin,
} from "@/Lib";
import ConfirmDialog from "@/components/ConfirmDialog";
import StatCard from "@/components/StatusCard";
import DropDownNotification from "@/components/DropDownNotification";
import {
  ConfirmDialogProps,
  CourseState,
  PaymentItemState,
  UserState,
} from "@/Interfaces";

// ─── Tab Type ─────────────────────────────────────────────────────────────────
type Tab = "overview" | "courses" | "users" | "payments";

// ─── Role Badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    admin: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
    instructor: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    student: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${map[role] ?? ""}`}
    >
      {role}
    </span>
  );
}

// ─── Payment Status Badge ─────────────────────────────────────────────────────
function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    rejected: "bg-red-500/15 text-red-400 border border-red-500/20",
    pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${map[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [courses, setCourses] = useState<CourseState[]>([]);
  const [users, setUsers] = useState<UserState[]>([]);
  const [payments, setPayments] = useState<PaymentItemState[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogProps>({
    open: false,
    title: "",
    message: "",
    confirmLabel: "",
    confirmClass: "",
    image: "",
    iconsBgClass: "",
    onConfirm: () => {},
  });

  const closeDialog = () => setConfirmDialog((d) => ({ ...d, open: false }));

  // ── Course Handlers ────────────────────────────────────────────────────────

  const fetchCourses = async () => {
    setLoading(true);
    const data = await getAllCourses();
    setCourses(data.courses);
    setLoading(false);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete Course",
      message: `Are you sure you want to permanently delete "${title}"? This action cannot be undone.`,
      confirmLabel: "Delete Course",
      confirmClass:
        "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20",
      iconsBgClass: "bg-red-500/10 border border-red-500/20",
      onConfirm: async () => {
        const data = await deleteCourseByAdmin(id);
        closeDialog();
        if (data) {
          fetchCourses();
        }
      },
    });
  };
  // ── User Handlers ───────────────────────────────────────────────────────

  const fetchAdminUserData = async () => {
    setLoading(true);
    const data = await getAllUsersByAdmin();
    setUsers(data.users);
    setLoading(false);
  };

  const handleToggleAdmin = async (id: string, title: string, role: string) => {
    setConfirmDialog({
      open: true,
      title: "Toggle Admin",
      message: `Are you sure you want to ${role === "admin" ? "remove" : "add"} ${title} as an admin?`,
      confirmLabel: role === "admin" ? "Remove Admin" : "Add Admin",
      confirmClass:
        role === "admin"
          ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20"
          : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20",
      iconsBgClass:
        role === "admin"
          ? "bg-red-500/10 border border-red-500/20"
          : "bg-blue-500/10 border border-blue-500/20",
      onConfirm: async () => {
        const data = await toggleUserAdmin(id);
        closeDialog();
        if (data) {
          fetchAdminUserData();
        }
      },
    });
  };
  const handleDeleteUser = (id: string, title: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete User",
      message: `Are you sure you want to permanently delete "${title}"? All their data will be lost.`,
      confirmLabel: "Delete User",
      confirmClass:
        "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20",
      iconsBgClass: "bg-red-500/10 border border-red-500/20",
      onConfirm: async () => {
        const data = await deleteUserByAdmin(id);
        closeDialog();
        if (data) {
          fetchAdminUserData();
        }
      },
    });
  };
  // ── Payment Handlers ───────────────────────────────────────────────────────

  const fetchAdminPaymentData = async () => {
    setLoading(true);
    const data = await getAdminAllPayments();
    setPayments(data.payments);

    setLoading(false);
  };

  const handleAdminApprovePayment = async (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p._id === paymentId ? { ...p, status: "approved" } : p)),
    );
    const data = await adminApprovePayment(paymentId);

    if (data) fetchAdminPaymentData();
  };

  const handleAdminRejectPayment = async (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p._id === paymentId ? { ...p, status: "rejected" } : p)),
    );
    const data = await adminRejectPayment(paymentId);
    if (data) fetchAdminPaymentData();
  };

  const handleViewProof = (image: string, message: string) => {
    setConfirmDialog({
      open: true,
      title: "Payment Proof",
      message: `The Phone Number for Payment : ${message}`,
      image,
      confirmLabel: "Close",
      confirmClass:
        "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20",
      iconsBgClass: "bg-blue-500/10 border border-blue-500/20",
      onConfirm: () => closeDialog(),
    });
  };

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
    fetchAdminPaymentData();
    fetchCourses();
    fetchAdminUserData();
    fetchNotification();
  }, []);

  // ── Tabs Config ────────────────────────────────────────────────────────────
  const tabs: {
    id: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard size={16} />,
    },
    {
      id: "courses",
      label: "Courses",
      icon: <BookOpen size={16} />,
      badge: courses.length,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={16} />,
      badge: users.length,
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard size={16} />,
      badge: payments?.length || undefined,
    },
  ];
  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans overflow-x-hidden">
      {/* ── Ambient Blobs ── */}
      <div className="fixed top-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-2xl bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-linear-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-white/30 font-medium">
                  Platform control center
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-40"
              onClick={fetchAdminUserData}
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">
                {loading ? "Loading…" : "Refresh"}
              </span>
            </button>
          </div>
        </div>

        {/* ── Tabs Navigation ── */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/3 border border-white/5 w-fit flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-black/10 text-black"
                      : tab.id === "payments"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-white/10 text-white/60"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            TAB: OVERVIEW
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                label="Total Courses"
                value={courses.length}
                sub="+2 this month"
                gradient="bg-gradient-to-br from-blue-600 to-blue-800"
                glow="bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_60%)]"
                icon={<BookOpen size={20} className="text-white" />}
              />
              <StatCard
                label="Total Users"
                value={users.length}
                sub="+24 this week"
                gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
                glow="bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_60%)]"
                icon={<Users size={20} className="text-white" />}
              />
              <StatCard
                label="Total Revenue"
                value={`$${payments
                  ?.filter((p: any) => p?.status === "approved")
                  ?.reduce((acc: number, p: any) => acc + p?.course?.price, 0)
                  ?.toLocaleString("en-US")}`}
                sub="+18% vs last month"
                gradient="bg-gradient-to-br from-purple-600 to-purple-800"
                glow="bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_60%)]"
                icon={<DollarSign size={20} className="text-white" />}
              />
              <StatCard
                label="Pending Payments"
                value={
                  payments?.filter((p: any) => p?.status === "pending")?.length
                }
                sub="Awaiting approval"
                gradient="bg-gradient-to-br from-amber-600 to-amber-800"
                glow="bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_60%)]"
                icon={<Clock size={20} className="text-white" />}
              />
            </div>

            {/* Recent Activity + Top Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Courses */}
              <div className="lg:col-span-2 rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-blue-400" />
                    <h3 className="font-bold text-sm text-white/90">
                      Top Performing Courses
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="text-[10px] font-bold text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    View All →
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {courses.slice(0, 4).map((c: any, i: any) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors"
                    >
                      <div className="size-8 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black text-white/30 border border-white/5 shrink-0">
                        <img
                          width={25}
                          height={25}
                          src={c?.imageUrl}
                          alt=""
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/90 truncate">
                          {c?.title}
                        </p>
                        <p className="text-xs text-white/30">
                          {c.instructor?.name || "Deleted Instructor"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-white/90">
                          {c?.enrollments?.length}
                        </p>
                        <div className="flex items-center gap-1 justify-end">
                          <Star
                            size={10}
                            className="text-amber-400 fill-amber-400"
                          />
                          <span className="text-[10px] text-white/40 font-semibold"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Pending Payments */}
              <div className="rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-amber-400" />
                    <h3 className="font-bold text-sm text-white/90">
                      Pending Payments
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("payments")}
                    className="text-[10px] font-bold text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    View All →
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {payments.filter((p: any) => p.status === "pending").length >
                  0 ? (
                    payments
                      .slice(0, 4)
                      .filter((p: any) => p.status === "pending")
                      .map((p: any) => (
                        <div
                          key={p._id}
                          className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-white/80 truncate max-w-[120px]">
                              {p?.student?.name}
                            </p>
                            <span className="text-xs font-black text-amber-400">
                              {p?.course?.price}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/30 truncate">
                            {p?.course?.title}
                          </p>
                          <div className="flex gap-2">
                            <button
                              className="flex-1 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                              onClick={() => handleAdminApprovePayment(p._id)}
                            >
                              Approve
                            </button>
                            <button
                              className="flex-1 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                              onClick={() => handleAdminRejectPayment(p._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="py-8 text-center">
                      <CheckCircle2
                        size={32}
                        className="text-emerald-400 mx-auto mb-2"
                      />
                      <p className="text-xs text-white/30 font-semibold">
                        All caught up!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Breakdown */}
            <div className="rounded-2xl bg-white/3 border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users size={16} className="text-emerald-400" />
                <h3 className="font-bold text-sm text-white/90">
                  User Breakdown
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    role: "Students",
                    count: users.filter((u) => u.role === "student").length,
                    color: "from-emerald-600 to-emerald-800",
                    icon: <GraduationCap size={18} className="text-white" />,
                  },
                  {
                    role: "Instructors",
                    count: users.filter((u) => u.role === "instructor").length,
                    color: "from-blue-600 to-blue-800",
                    icon: <BookMarked size={18} className="text-white" />,
                  },
                  {
                    role: "Admins",
                    count: users.filter((u) => u.role === "admin").length,
                    color: "from-purple-600 to-purple-800",
                    icon: <ShieldCheck size={18} className="text-white" />,
                  },
                ].map((item) => (
                  <div
                    key={item.role}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5"
                  >
                    <div
                      className={`size-12 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">
                        {item.count}
                      </p>
                      <p className="text-xs text-white/40 font-semibold">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB: COURSES
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "courses" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Table */}
            <div className="rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        Course
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden md:table-cell">
                        Instructor
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden lg:table-cell">
                        Students
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden xl:table-cell">
                        Rating
                      </th>
                      <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course: any) => (
                      <tr
                        key={course._id}
                        className="border-b border-white/4 hover:bg-white/2 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/5 flex items-center justify-center shrink-0">
                              <BookOpen size={16} className="text-blue-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-white/90 truncate max-w-[180px]">
                                {course.title}
                              </p>
                              <p className="text-[10px] text-white/30 mt-0.5">
                                {course?.category
                                  ?.map((c: string) => c)
                                  ?.join(", ")}{" "}
                                · {course?.level || ""}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-white/60 font-medium">
                            {course?.instructor?.name || "Deleted Instructor"}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-white/30" />
                            <span className="text-white/70 font-semibold">
                              {}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden xl:table-cell">
                          <div className="flex items-center gap-1">
                            <Star
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                            <span className="text-white/70 font-semibold text-xs">
                              {course.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Link
                              href={`/courses/${course._id}`}
                              className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                              <Eye size={14} />
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteCourse(course._id, course.title)
                              }
                              className="size-8 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/50 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {courses.length === 0 && (
                  <div className="py-16 text-center">
                    <BookOpen
                      size={40}
                      className="text-white/10 mx-auto mb-3"
                    />
                    <p className="text-white/30 font-semibold">
                      No courses found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB: USERS
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Table */}
            <div className="rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        User
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden sm:table-cell">
                        Role
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden lg:table-cell">
                        Courses
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden lg:table-cell">
                        Joined
                      </th>
                      <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/4 hover:bg-white/2 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="size-10 rounded-xl border border-white/10 bg-white/5"
                            />
                            <div>
                              <p className="font-semibold text-white/90">
                                {user.name}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Mail size={10} className="text-white/20" />
                                <span className="text-[10px] text-white/30">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={12} className="text-white/30" />
                            <span className="text-white/60 font-semibold">
                              {user.enrolledCourses}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-white/30" />
                            <span className="text-white/40 text-xs">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() =>
                                handleToggleAdmin(
                                  user._id,
                                  user.name,
                                  user.role,
                                )
                              }
                              title={
                                user.role === "admin"
                                  ? "Revoke Admin"
                                  : "Make Admin"
                              }
                              className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
                                user.role === "admin"
                                  ? "bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20"
                                  : "bg-white/5 border-white/10 text-white/30 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20"
                              }`}
                            >
                              {user.role === "admin" ? (
                                <ShieldOff size={14} />
                              ) : (
                                <ShieldCheck size={14} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteUser(user._id, user.name)
                              }
                              className="size-8 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/50 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <div className="py-16 text-center">
                    <Users size={40} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 font-semibold">
                      No users found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB: PAYMENTS
        ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "payments" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Table */}
            <div className="rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        User
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden md:table-cell">
                        Course
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden sm:table-cell">
                        Amount
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden lg:table-cell">
                        Method
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 hidden lg:table-cell">
                        Date
                      </th>
                      <th className="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        Status
                      </th>
                      <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments?.map((payment: PaymentItemState) => (
                      <tr
                        key={payment._id}
                        className="border-b border-white/4 hover:bg-white/2 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white/90">
                            {payment?.student?.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Mail size={10} className="text-white/20" />
                            <span className="text-[10px] text-white/30">
                              {payment?.student?.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-white/60 text-xs max-w-[160px] block truncate">
                            {payment?.course
                              ? payment?.course?.title
                              : "Deleted Course"}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          <span className="font-black text-white/90">
                            {payment?.course?.price}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <CreditCard size={12} className="text-white/30" />
                            <span className="text-white/40 text-xs">
                              {payment?.paymentMethod}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-white/30" />
                            <span className="text-white/40 text-xs">
                              {new Date(
                                payment?.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <PaymentBadge status={payment?.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          {payment?.status === "pending" ? (
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                                onClick={() =>
                                  handleAdminApprovePayment(payment?._id)
                                }
                              >
                                <CheckCircle2 size={12} />
                                Approve
                              </button>
                              <button
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                                onClick={() =>
                                  handleAdminRejectPayment(payment?._id)
                                }
                              >
                                <XCircle size={12} />
                                Reject
                              </button>
                              <button
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                                onClick={() =>
                                  handleViewProof(
                                    payment?.paymentProof,
                                    payment?.phoneNumber,
                                  )
                                }
                              >
                                <Image size={12} />
                                Show Proof
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-white/20 font-semibold">
                              {payment?.status === "approved"
                                ? "✓ Approved"
                                : "✗ Rejected"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {payments.length === 0 && (
                  <div className="py-16 text-center">
                    <CreditCard
                      size={40}
                      className="text-white/10 mx-auto mb-3"
                    />
                    <p className="text-white/30 font-semibold">
                      No payments found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Dialog ── */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        image={confirmDialog.image}
        confirmClass={confirmDialog.confirmClass}
        iconsBgClass={confirmDialog.iconsBgClass}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  );
}
