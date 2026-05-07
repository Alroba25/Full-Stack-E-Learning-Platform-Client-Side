"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyCourses, getToken } from "@/Lib";
import Navbar from "@/components/Navbar";
import { CourseState } from "@/Interfaces";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";

export default function MyCourses() {
  const token = getToken();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchMyCourses = async () => {
      try {
        const data = await getMyCourses(router);
        // Filter out enrollments where the course object is null
        const validEnrollments = (data?.enrollments || []).filter(
          (item: any) => item.course !== null,
        );
        setCourses(validEnrollments);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyCourses();
  }, []);
  console.log(courses);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans relative overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(138,43,226,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
      <Navbar />

      <main className="max-w-[1400px] w-full mx-auto px-8 py-16 relative z-10 grow">
        <header className="mb-16">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tighter">
            My Learning
          </h1>
          <p className="text-[#a0a0a0] text-lg">
            Pick up where you left off and continue your educational journey.
          </p>
        </header>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course: any, idx: number) => (
              <div
                key={course.id || course._id || idx}
                className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:bg-white/5 hover:border-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-[160px] w-full bg-linear-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider text-white border border-white/10 z-10">
                    Enrolled
                  </span>
                  <Image
                    src={course.course?.imageUrl || "/Darsfiy-cover-course.png"}
                    alt={course.course?.title || "Course Cover"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[1.15rem] font-bold mb-2 leading-tight line-clamp-2">
                    {course.course?.title || "Untitled Course"}
                  </h3>
                  <p className="text-[0.85rem] text-[#888] mb-4 grow line-clamp-2">
                    {course.course?.description || "No description available."}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 rounded-full bg-linear-to-r from-purple-500 to-blue-500"></div>
                    <span className="text-[0.85rem] text-[#aaa]">
                      {course.course?.instructor?.name || "Instructor"}
                    </span>
                  </div>

                  {/* Progress bar mock */}
                  <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
                    <div
                      className="bg-linear-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                      style={{ width: `${course?.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[0.75rem] text-[#888] mb-6">
                    <span>{course?.progress}%</span>
                  </div>

                  <Link
                    href={`/learning?courseId=${course.course?._id || course.course?.id}`}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center text-sm font-semibold transition-all duration-300 group flex items-center justify-center gap-2"
                  >
                    Continue Learning
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/2 border border-white/5 rounded-2xl">
            <span className="text-6xl mb-6">📚</span>
            <h2 className="text-2xl font-bold mb-3">No courses yet</h2>
            <p className="text-[#888] mb-8 text-center max-w-md">
              You haven't enrolled in any courses yet. Browse our catalog to
              start learning today!
            </p>
            <Link
              href="/courses"
              className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        )}
      </main>

      <footer className="p-16 text-center border-t border-white/5 text-[#666] mt-auto">
        <p>&copy; 2026 E-Platform Learning. Premium Educational Experience.</p>
      </footer>
    </div>
  );
}
