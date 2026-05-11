"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  getCourseLessons,
  getCourse,
  getToken,
  makelessonCompleted,
  getMyCourses,
} from "@/Lib";
import Navbar from "@/components/Navbar";
import { CourseState } from "@/Interfaces";
import { PlayCircle, CheckCircle, Menu, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

function LearningContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const router = useRouter();
  const token = getToken();

  const [course, setCourse] = useState<CourseState | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLessonComplete = async () => {
    if (activeLesson) {
      const lessonId = activeLesson._id || activeLesson.id;
      const data = await makelessonCompleted(lessonId, router);
      if (data) {
        setCompletedLessons((prev) => {
          const newSet = new Set(prev);
          newSet.add(lessonId);
          return newSet;
        });
      }
    }
  };

  const progressPercentage =
    lessons.length > 0
      ? Math.round((completedLessons.size / lessons.length) * 100)
      : 0;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (!courseId) {
      router.push("/my-courses");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [courseData, lessonsData, myCoursesData] = await Promise.all([
          getCourse(courseId, router),
          getCourseLessons(courseId, router),
          getMyCourses(router),
        ]);

        setCourse(courseData?.course || courseData);

        const fetchedLessons = Array.isArray(lessonsData)
          ? lessonsData
          : lessonsData?.lessons || [];
        setLessons(fetchedLessons);

        const initialCompleted = new Set<string>();

        // Check if individual lessons have a completed flag from backend
        fetchedLessons.forEach((lesson: any) => {
          if (
            lesson.isCompleted === true ||
            lesson.completed === true ||
            lesson.status === "completed"
          ) {
            initialCompleted.add(lesson._id || lesson.id);
          }
        });

        // Check enrollment data for completedLessons array
        if (myCoursesData && myCoursesData.enrollments) {
          const enrollment = myCoursesData.enrollments.find((e: any) => {
            const eCourseId = e.course?._id || e.course?.id || e.course;
            return eCourseId === courseId;
          });

          if (
            enrollment?.completedLessons &&
            Array.isArray(enrollment.completedLessons)
          ) {
            enrollment.completedLessons.forEach((item: any) => {
              const id =
                typeof item === "object" && item !== null
                  ? item._id || item.id
                  : item;
              initialCompleted.add(id.toString());
            });
          }
        }

        setCompletedLessons(initialCompleted);

        if (fetchedLessons.length > 0) {
          // Default to first lesson, or find first uncompleted lesson
          const firstUncompleted =
            fetchedLessons.find(
              (l: any) => !initialCompleted.has(l._id || l.id),
            ) || fetchedLessons[0];
          setActiveLesson(firstUncompleted);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId, token, router]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  console.log("course", course);
  console.log("lessons", activeLesson);
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-white font-sans selection:bg-[#4facfe]/30">
      <Navbar />

      {/* Header bar */}
      <div className="bg-[#111] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/my-courses"
            className="hover:text-[#4facfe] transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <ChevronLeft size={16} /> Back to My Courses
          </Link>
          <div className="w-px h-6 bg-white/20 hidden md:block"></div>
          <h1 className="font-bold text-lg hidden md:block truncate max-w-lg">
            {course?.title || "Course"}
          </h1>
        </div>
        <button
          className="lg:hidden flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-sm font-semibold">Course Content</span>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area (Video & Description) */}
        <div className="flex-1 overflow-y-auto lg:pr-[350px] xl:pr-[400px]">
          <div className="w-full bg-black aspect-video relative shadow-2xl border-b border-white/5">
            {activeLesson?.videoUrl ? (
              getYouTubeId(activeLesson.videoUrl) ? (
                <iframe
                  key={activeLesson._id || activeLesson.id}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeLesson.videoUrl)}?autoplay=1`}
                  title={activeLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  key={activeLesson._id || activeLesson.id}
                  controls
                  className="w-full h-full object-contain bg-black"
                  src={activeLesson.videoUrl}
                  autoPlay
                  onEnded={handleLessonComplete}
                >
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#888]">
                <PlayCircle size={64} className="mb-4 opacity-50" />
                <p>No video available for this lesson.</p>
              </div>
            )}
          </div>

          <div className="p-8 max-w-4xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl font-extrabold">
                {activeLesson?.title || "Select a lesson"}
              </h2>
              {activeLesson && (
                <button
                  onClick={handleLessonComplete}
                  disabled={completedLessons.has(
                    activeLesson._id || activeLesson.id,
                  )}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                    completedLessons.has(activeLesson._id || activeLesson.id)
                      ? "bg-green-500/20 text-green-500 border border-green-500/30 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <CheckCircle size={18} />
                  {completedLessons.has(activeLesson._id || activeLesson.id)
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              )}
            </div>
            <div className="prose prose-invert max-w-none text-[#d1d7dc] space-y-4">
              {activeLesson?.content ? (
                <p>{activeLesson.content}</p>
              ) : (
                <p>
                  Learn the fundamental concepts in this lesson. Pay close
                  attention to the video material above.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Lessons List) */}
        <div
          className={`fixed inset-y-0 right-0 z-30 w-full md:w-[350px] xl:w-[400px] bg-linear-to-b from-[#111] to-[#0a0a0a] border-l border-white/10 transform transition-transform duration-300 ease-in-out flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
        >
          <div className="pt-[72px] lg:pt-0 shrink-0">
            <div className="p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <h3 className="font-extrabold text-xl bg-clip-text text-transparent bg-linear-to-r from-white to-white/60">
                Course Content
              </h3>
              <p className="text-sm text-[#4facfe] mt-2 font-semibold tracking-wide uppercase">
                {lessons.length} lessons
              </p>
            </div>

            {/* Progress Bar in sidebar */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/10">
              <div className="flex justify-between text-xs text-[#888] mb-2 font-bold">
                <span>Course Progress</span>
                <span className="text-white">{progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#4facfe] to-[#00f2fe] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="p-4 space-y-2">
              {lessons.map((lesson, index) => {
                const isActive =
                  (activeLesson?._id || activeLesson?.id) ===
                  (lesson._id || lesson.id);
                const isCompleted = completedLessons.has(
                  lesson._id || lesson.id,
                );

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveLesson(lesson);
                      setSidebarOpen(false);
                    }}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border 
                      ${
                        isActive
                          ? "bg-linear-to-r from-[#4facfe]/20 to-transparent border-[#4facfe]/50 shadow-[0_0_20px_rgba(79,172,254,0.15)]"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#4facfe] to-[#00f2fe]"></div>
                    )}
                    <div className="p-4 flex gap-4 items-center relative z-10">
                      <div
                        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                        ${isActive ? "bg-[#4facfe]/20 text-[#4facfe] shadow-[0_0_15px_rgba(79,172,254,0.3)]" : isCompleted ? "bg-green-500/20 text-green-500" : "bg-black/50 text-[#888] group-hover:bg-white/10 group-hover:text-white"}`}
                      >
                        {isActive ? (
                          <PlayCircle
                            size={20}
                            className="fill-current animate-pulse"
                          />
                        ) : isCompleted ? (
                          <CheckCircle size={18} />
                        ) : (
                          <span className="font-bold text-sm">{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-[0.95rem] font-bold line-clamp-2 leading-tight transition-colors duration-300
                            ${isActive ? "text-white" : isCompleted ? "text-[#d1d7dc]" : "text-[#d1d7dc] group-hover:text-white"}`}
                        >
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2 text-xs font-medium">
                          <div
                            className={`flex items-center gap-1.5 ${isActive ? "text-[#4facfe]" : "text-[#888]"}`}
                          >
                            <PlayCircle size={12} />
                            <span>{lesson.duration || "10:00"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {lessons.length === 0 && (
                <div className="p-8 text-center text-[#888] bg-white/5 rounded-xl border border-white/5">
                  No lessons found for this course.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}

export default function LearningPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LearningContent />
    </Suspense>
  );
}
