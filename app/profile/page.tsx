"use client";
import { UserState } from "@/Interfaces";
import { getProfile, getMyCourses, getToken, removeToken } from "@/Lib";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  UserRound,
  BookOpen,
  CheckCircle,
  Calendar,
  LogOut,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserState | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileData, coursesData] = await Promise.all([
          getProfile(router),
          getMyCourses(router),
        ]);
        if (profileData) setProfile(profileData);
        if (coursesData?.enrollments) setEnrollments(coursesData.enrollments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);
  console.log(profile);
  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  // Calculate stats
  const totalCourses = enrollments.length;
  const totalCompletedLessons = enrollments.reduce((sum, current) => {
    return (
      sum + (current.completedLessons ? current.completedLessons.length : 0)
    );
  }, 0);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-[#4facfe]/30">
      {/* Background glow effects */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(79,172,254,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(164,53,240,0.08)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="grow z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (User Info) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="relative mb-6 group">
              <div className="w-32 h-32 bg-linear-to-br from-[#00f2fe] to-[#4facfe] rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(79,172,254,0.3)] transition-transform duration-500 group-hover:scale-105">
                <span className="text-5xl font-extrabold text-white shadow-sm">
                  {profile?.user?.name ? (
                    profile?.user?.name.charAt(0).toUpperCase()
                  ) : (
                    <UserRound size={48} />
                  )}
                </span>
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-7 h-7 rounded-full border-4 border-[#111] shadow-lg"></div>
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
              {profile?.user?.name || "Student"}
            </h2>
            <p className="text-[#a0a0a0] mb-6 font-medium">
              {profile?.user?.email || "student@example.com"}
            </p>

            <div className="w-full bg-black/40 rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#888]">
                  <UserRound size={16} />
                  <span className="text-sm font-medium">Role</span>
                </div>
                <span className="text-sm font-bold text-white capitalize bg-white/10 px-3 py-1 rounded-full">
                  {profile?.user?.role || "Student"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#888]">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Joined</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {profile?.user?.createdAt
                    ? new Date(profile.user.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" },
                      )
                    : "Recently"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/40 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-4xl font-extrabold mb-2 tracking-tighter">
                My Dashboard
              </h1>
              {profile?.user?.role === "instructor" && (
                <Link
                  href="/instructor/dashboard"
                  className="group flex items-center gap-2 bg-linear-to-r from-[#a435f0]/20 to-[#8710d8]/20 hover:from-[#a435f0]/40 hover:to-[#8710d8]/40 border border-[#a435f0]/30 px-5 py-2.5 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(164,53,240,0.3)] hover:-translate-y-0.5"
                >
                  <LayoutDashboard
                    size={18}
                    className="text-[#a435f0] group-hover:text-white transition-colors"
                  />
                  <span>Instructor Dashboard</span>
                  <ChevronRight
                    size={16}
                    className="text-[#888] group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </Link>
              )}
              {profile?.user?.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="group flex items-center gap-2 bg-linear-to-r from-[#a435f0]/20 to-[#8710d8]/20 hover:from-[#a435f0]/40 hover:to-[#8710d8]/40 border border-[#a435f0]/30 px-5 py-2.5 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(164,53,240,0.3)] hover:-translate-y-0.5"
                >
                  <LayoutDashboard
                    size={18}
                    className="text-[#a435f0] group-hover:text-white transition-colors"
                  />
                  <span>Admin Dashboard</span>
                  <ChevronRight
                    size={16}
                    className="text-[#888] group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </Link>
              )}
            </div>
            <p className="mt-5 text-[#888] text-lg">
              Welcome back! Track your progress and jump right back into
              learning.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:bg-white/10 transition-colors duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#4facfe]/20 to-[#00f2fe]/20 flex items-center justify-center border border-[#4facfe]/30">
                  <BookOpen className="text-[#4facfe]" size={24} />
                </div>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">
                  {totalCourses}
                </span>
              </div>
              <h3 className="text-[#d1d7dc] font-bold text-lg group-hover:text-white transition-colors">
                Enrolled Courses
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:bg-white/10 transition-colors duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#a435f0]/20 to-[#8710d8]/20 flex items-center justify-center border border-[#a435f0]/30">
                  <CheckCircle className="text-[#a435f0]" size={24} />
                </div>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">
                  {totalCompletedLessons}
                </span>
              </div>
              <h3 className="text-[#d1d7dc] font-bold text-lg group-hover:text-white transition-colors">
                Completed Lessons
              </h3>
            </div>
          </div>

          {/* Recent Activity / Courses */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md grow">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold">My Courses</h3>
              <Link
                href="/my-courses"
                className="text-[#4facfe] hover:text-[#00f2fe] font-bold text-sm flex items-center gap-1 transition-colors"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.slice(0, 3).map((enrollment, idx) => {
                  const course = enrollment.course;
                  if (!course) return null;
                  return (
                    <Link
                      href={`/learning?courseId=${course._id || course.id}`}
                      key={idx}
                      className="block bg-black/40 border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/5 shrink-0 overflow-hidden relative">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-[#333] to-[#111] flex items-center justify-center">
                              <BookOpen size={20} className="text-[#888]" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate group-hover:text-[#4facfe] transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-xs text-[#888] font-medium">
                              <CheckCircle
                                size={14}
                                className="text-green-500"
                              />
                              <span>
                                {enrollment.completedLessons?.length || 0}{" "}
                                lessons done
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#4facfe]/20 flex items-center justify-center transition-colors border border-white/5 group-hover:border-[#4facfe]/30">
                          <ChevronRight
                            size={18}
                            className="text-[#888] group-hover:text-[#4facfe]"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <BookOpen size={32} className="text-[#888]" />
                </div>
                <p className="text-[#888] font-medium mb-6">
                  You haven't enrolled in any courses yet.
                </p>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-3 bg-linear-to-r from-[#4facfe] to-[#00f2fe] text-black font-extrabold rounded-xl hover:shadow-[0_0_20px_rgba(79,172,254,0.4)] transition-all transform hover:-translate-y-1"
                >
                  Explore Courses
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
