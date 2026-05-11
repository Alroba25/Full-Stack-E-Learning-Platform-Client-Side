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
  console.log("course", course);
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
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                    {course?.category || "Programming"}
                  </span>
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
            <LessonsSeaction id={id} />

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold">Description</h2>
              <div className="prose prose-invert max-w-none text-[#d1d7dc] space-y-4 text-[0.95rem] leading-relaxed">
                <p>
                  In this comprehensive course, you will dive deep into{" "}
                  {course?.title}. We have carefully structured the curriculum
                  to take you from a complete beginner to a professional level.
                </p>
                <p>
                  Whether you are looking to advance your current career or
                  start a new path in tech, this course provides the practical
                  skills and theoretical knowledge you need to succeed in the
                  modern market.
                </p>
                <button className="text-[#c0c4fc] font-bold hover:text-white transition-colors mt-4 underline decoration-2 underline-offset-4">
                  Show more
                </button>
              </div>
            </div>
          </div>

          {/* Floating Sidebar (Desktop Sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-black border border-white/15 rounded-lg shadow-2xl overflow-hidden">
              <div className="relative h-[200px] group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <PlayCircle size={64} className="text-white shadow-2xl" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#1c1d1f] to-transparent z-0"></div>
                <div className="w-full h-full bg-[#2a2a2e] flex items-center justify-center text-white/20">
                  <PlayCircle size={48} />
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-extrabold text-lg z-10">
                  Preview this course
                </span>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">
                    {course?.price === 0 ? (
                      <span className="text-green-500 font-bold ml-auto text-2xl">
                        Free
                      </span>
                    ) : (
                      "$" + course?.price
                    )}
                  </span>
                  {!course?.isFree && (
                    <>
                      <span className="text-[#888] line-through text-lg">
                        $149.99
                      </span>
                      <span className="text-green-500 font-bold ml-auto text-sm">
                        85% off
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {course?.isFree ? (
                    haveCourse ? (
                      <Link
                        href={`/learning?courseId=${id}`}
                        className="cursor-pointer group flex items-center justify-center gap-2 rounded-lg w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                      >
                        <span>Countinue the course</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleGetTheCourse(id)}
                        className="cursor-pointer group flex items-center justify-center gap-2 rounded-lg w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                      >
                        <span>Get The Course</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )
                  ) : (
                    <div>
                      {haveCourse ? (
                        <Link
                          href={`/learning?courseId=${id}`}
                          className="cursor-pointer group flex items-center justify-center gap-2 rounded-lg w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                        >
                          <span>Countinue the course</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <>
                          <button className="mb-3 cursor-pointer group flex items-center justify-center gap-2 w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 rounded-lg">
                            <span>Add to cart</span>
                          </button>
                          <Link
                            href={`/checkout?courseId=${id}`}
                            className="w-full py-4 border-2 border-white text-white font-extrabold hover:bg-white/5 transition-all duration-300 rounded-lg flex items-center justify-center"
                          >
                            Buy now
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-center text-xs text-[#888]">
                  30-Day Money-Back Guarantee
                </p>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm">This course includes:</h4>
                  <ul className="space-y-3 text-sm text-[#d1d7dc]">
                    <li className="flex items-center gap-3">
                      <PlayCircle size={16} />
                      <span>24 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText size={16} />
                      <span>12 articles</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Download size={16} />
                      <span>45 downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Smartphone size={16} />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Trophy size={16} />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-[#c0c4fc]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer border-0 bg-transparent hover:underline">
                        Share
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                          Anyone who has this link will be able to view this.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="link"
                            defaultValue={`http://localhost:3000/courses/${id}`}
                            readOnly
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <button className="hover:underline">Gift this course</button>
                  <button className="hover:underline">Apply Coupon</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer (matches global style) */}
        <footer className="p-16 text-center border-t border-white/5 text-[#666] mt-16 bg-black">
          <p>
            &copy; 2026 E-Platform Learning. Premium Educational Experience.
          </p>
        </footer>
      </div>
    </>
  );
}
