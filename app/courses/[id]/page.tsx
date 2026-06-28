"use client";
import { CourseState } from "@/Interfaces";
import { enrollInCourse, getCourse, getToken, getMyCourses } from "@/Lib";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  Star,
  Globe,
  Calendar,
  ChevronRight,
  PlayCircle,
  FileText,
  Download,
  Smartphone,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import LessonsSeaction from "@/components/LessonsSeaction";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { getTimeAgo } from "@/Lib/utils";
import CoursePursherCard from "@/components/CoursePursherCard";
export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = getToken();
  const router = useRouter();
  const { id } = use(params);
  const [course, setCourse] = useState<CourseState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [haveCourse, setHaveCourse] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchCourseAndEnrollments = async () => {
      setIsLoading(true);
      try {
        const [courseData, myCoursesData] = await Promise.all([
          getCourse(id, router),
          getMyCourses(router),
        ]);
        setCourse(courseData?.course || courseData);
        setPaymentStatus(courseData?.paymentStatus);

        if (myCoursesData && myCoursesData.enrollments) {
          const isEnrolled = myCoursesData.enrollments.some((e: any) => {
            const eCourseId = e.course?._id || e.course?.id || e.course;
            return eCourseId === id;
          });
          setHaveCourse(isEnrolled);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseAndEnrollments();
  }, [id, token, router]);

  const handleGetTheCourse = async (courseId: string) => {
    const currentToken = getToken();
    if (!currentToken) {
      router.push("/login");
      return;
    }
    const data = await enrollInCourse(courseId, router);
    if (data) {
      setHaveCourse(true);
      // Refresh course data or update state
      const updatedData = await getCourse(courseId, router);
      setCourse(updatedData?.course || updatedData);
    }
  };
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  console.log(course);
  return (
    <>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-[#4facfe]/30">
        <Navbar />

        {/* Header Section (Dark) */}
        <section className="bg-black py-12 border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-8 lg:grid lg:grid-cols-[1fr_350px] gap-12">
            <div className="space-y-6">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm font-bold text-[#cec0fc]">
                <Link href="/courses" className="hover:underline">
                  Courses
                </Link>
                <ChevronRight size={14} />
                <span className="text-white opacity-80 truncate">
                  {course?.title}
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                {course?.title}
              </h1>

              <p className="text-xl text-[#d1d7dc] max-w-[800px] leading-relaxed">
                {course?.description ||
                  "Master the latest technologies with industry experts. This comprehensive course covers everything from fundamentals to advanced patterns."}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-[#f3ca8c] font-bold">
                  <span>4.8</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i <= 4 ? "#f3ca8c" : "none"}
                        color="#f3ca8c"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[#c0c4fc] underline">
                  (2,450 ratings)
                </span>
                <span className="text-white opacity-80">15,670 students</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-white opacity-80">Created by</span>
                <Link
                  href="#"
                  className="text-[#c0c4fc] font-bold underline hover:text-[#d1d7dc] transition-colors"
                >
                  {course?.instructor?.name || "Premium Instructor"}
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Category:</span>
                  {course?.category && course?.category.length > 0
                    ? course?.category?.map((category: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium"
                        >
                          {category}
                        </span>
                      ))
                    : "No Category"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Level:</span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-600/20 border border-blue-500/20 text-blue-400 font-medium">
                    {course?.level || "Beginner"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-white opacity-90">
                  <Calendar size={16} />
                  <span>
                    Last updated{" "}
                    {course?.updatedAt
                      ? new Date(course.updatedAt).toLocaleDateString()
                      : "10/2026"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-white opacity-90">
                  <Globe size={16} />
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Floating Sidebar Wrapper */}
        <div className=" bg-black max-w-[1200px] mx-auto px-8 py-12 lg:grid lg:grid-cols-[1fr_350px] gap-12 relative">
          {/* Main Content */}
          <div className="space-y-12">
            {/* What you'll learn */}
            <div className="border border-white/10 bg-black p-8 rounded-lg">
              <h2 className="text-2xl font-extrabold mb-6">
                What you&apos;ll learn
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Build scalable applications using industry standard patterns",
                  "Master modern toolchains and development environments",
                  "Implement robust security and authentication systems",
                  "Deploy and manage high-performance applications",
                  "Write clean, maintainable, and testable code",
                  "Advanced performance optimization techniques",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-white/60 shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-[#d1d7dc]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Placeholder */}
            {course && <LessonsSeaction id={course._id} />}

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold">Description</h2>
              <div className="prose prose-invert max-w-none text-[#d1d7dc] space-y-4 text-[0.95rem] leading-relaxed">
                <p>
                  In this comprehensive course, you will dive deep into{" "}
                  {course?.title}. We have carefully structured the curriculum
                  to take you from a complete beginner to a professional level.
                </p>
                <p>{course?.description}</p>
              </div>
            </div>
          </div>

          {/* Floating Sidebar (Desktop Sticky) */}
          <div className="hidden lg:block">
            <CoursePursherCard
              course={course}
              handleGetTheCourse={handleGetTheCourse}
              haveCourse={haveCourse}
              paymentStatus={paymentStatus}
            />
          </div>
          {/* Mobile Sticky Sidebar */}
          <div className="lg:hidden mt-8">
            <CoursePursherCard
              course={course}
              handleGetTheCourse={handleGetTheCourse}
              haveCourse={haveCourse}
              paymentStatus={paymentStatus}
            />
          </div>
        </div>
        {/* Footer (matches global style) */}
        <Footer />
      </div>
    </>
  );
}
