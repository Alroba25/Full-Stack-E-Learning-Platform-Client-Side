"use client";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { CourseState } from "@/Interfaces";
import { getAllCourses, getToken } from "@/Lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Clock,
  User,
  Heart,
  ChevronRight,
  BookOpen,
  Trophy,
} from "lucide-react";
import Footer from "@/components/Footer";
import { FiltersSide } from "@/components/FiltersSide";

export default function Courses() {
  const token = getToken();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    category: [] as string[],
    rating: null as number | null,
    level: [] as string[],
  });
  const fetchData = useCallback(async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getAllCourses(router, filter);
      setCourses(Array.isArray(data) ? data : data?.courses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [token, router, filter]);

  const handleCategoryChange = (category: string) => {
    setFilter((prev) => {
      const exists = prev.category.includes(category);
      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== category)
          : [...prev.category, category],
      };
    });
  };

  const handleRatingChange = (rating: number | null) => {
    setFilter((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const handleLevelChange = (level: string) => {
    setFilter((prev) => {
      const exists = prev.level.includes(level);
      return {
        ...prev,
        level: exists
          ? prev.level.filter((c) => c !== level)
          : [...prev.level, level],
      };
    });
  };

  const clearFilters = () => {
    setFilter({
      category: [],
      rating: null,
      level: [],
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    fetchData();
  }, [filter]);
  console.log(courses);
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(138,43,226,0.08)_0%,rgba(0,0,0,0)_70%)] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,123,255,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#666] mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-[#aaa]">Courses</span>
        </nav>

        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-6">
            <Trophy className="size-3 text-yellow-500" />
            Top-Tier Education
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            Master New Skills.
          </h1>
          <p className="text-[#888] text-xl max-w-2xl leading-relaxed">
            Elevate your career with industry-leading courses designed by
            experts. Join 50,000+ students learning the future today.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <FiltersSide
            filter={filter}
            clearFilters={clearFilters}
            handleCategoryChange={handleCategoryChange}
            handleRatingChange={handleRatingChange}
            handleLevelChange={handleLevelChange}
          />

          {/* Course Listings */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 p-5 bg-white/2 border border-white/5 rounded-2xl backdrop-blur-sm">
              <span className="text-[#888] text-sm font-medium">
                Showing{" "}
                <span className="text-white font-bold">{courses.length}</span>{" "}
                premium courses
              </span>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-[#666] text-sm whitespace-nowrap">
                  Sort by:
                </span>
                <div className="relative flex-1 sm:flex-initial">
                  <select className="appearance-none bg-white/5 text-white border border-white/10 rounded-lg px-4 py-2 pr-10 text-sm font-semibold cursor-pointer outline-none hover:bg-white/10 transition-all w-full sm:w-[180px]">
                    <option className="bg-[#141414]">Most Popular</option>
                    <option className="bg-[#141414]">Highest Rated</option>
                    <option className="bg-[#141414]">Newest</option>
                    <option className="bg-[#141414]">Price: Low to High</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                    <ChevronRight className="size-4 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {courses.map((course: any, index) => (
                <div
                  onClick={() => router.push(`/courses/${course._id}`)}
                  key={course.id || course._id || index}
                  className="cursor-pointer group relative bg-white/3 border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/6 hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.02)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                      {course.category && (
                        <span className="backdrop-blur-md bg-black/40 text-[0.65rem] font-black uppercase tracking-[0.1em] text-white/90 px-3 py-1.5 rounded-lg border border-white/10 shadow-xl group-hover:border-white/20 transition-all duration-500">
                          {course.category}
                        </span>
                      )}
                      {course.level && (
                        <span className="backdrop-blur-md bg-blue-600/30 text-[0.65rem] font-black uppercase tracking-[0.1em] text-blue-100 px-3 py-1.5 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:border-blue-400/30 transition-all duration-500">
                          {course.level}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(course._id);
                      }}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all z-20"
                    >
                      <Heart
                        className={`size-4 ${wishlist.includes(course._id) ? "fill-red-500 text-red-500 border-none" : ""}`}
                      />
                    </button>

                    <Image
                      src={course.imageUrl || "/Darsfiy-cover-course.png"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7">
                    <h3 className="hover:text-purple-600 text-xl font-bold mb-3 leading-tight min-h-14 line-clamp-2 text-white/90 group-hover:text-purple-600 transition-colors">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                        <User className="size-3 text-[#aaa]" />
                      </div>
                      <span className="text-[#888] text-sm font-medium">
                        {course.instructor?.name || "Premium Instructor"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="font-black text-white text-sm">
                          {course.rating || "5.0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#666] text-xs font-semibold uppercase tracking-wider">
                        <BookOpen className="size-3.5" />
                        12 Lessons
                      </div>
                      <div className="flex items-center gap-1.5 text-[#666] text-xs font-semibold uppercase tracking-wider">
                        <Clock className="size-3.5" />
                        24h
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[0.65rem] font-bold text-[#666] uppercase tracking-widest mb-1">
                          Total Price
                        </p>
                        <span className="text-2xl font-black text-white">
                          {course.price === 0 ? "Free" : "$" + course.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {courses.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <BookOpen className="size-10 text-[#444]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No courses found</h3>
                <p className="text-[#666] max-w-xs mx-auto">
                  We couldn't find any courses matching your criteria. Try
                  adjusting your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-8 text-white font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
