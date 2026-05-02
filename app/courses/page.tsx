"use client";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { CourseState } from "@/Interfaces";
import { getAllCourses, getToken } from "@/Lib";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Courses() {
  const token = getToken();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = useCallback(async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getAllCourses(router);
      setCourses(Array.isArray(data) ? data : data?.courses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(138,43,226,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-8 py-16 relative z-10">
        <header className="mb-16">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tighter">
            Explore Courses
          </h1>
          <p className="text-[#a0a0a0] text-lg">
            Choose from over 2,000 online video courses with new additions
            published every month.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:flex flex-col gap-10">
            <div className="filter-group">
              <h3 className="text-lg font-bold mb-5">Categories</h3>
              <div className="flex flex-col gap-3">
                {[
                  "Web Development",
                  "Data Science",
                  "Design",
                  "Business",
                  "Marketing",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center gap-3 text-[#888] text-[0.95rem] cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="w-[18px] h-[18px] border border-white/20 rounded bg-white/5"></div>
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="text-lg font-bold mb-5">Rating</h3>
              <div className="flex flex-col gap-3">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center gap-3 text-[#888] text-[0.95rem] cursor-pointer hover:text-white transition-colors"
                  >
                    <div className="w-[18px] h-[18px] border border-white/20 rounded bg-white/5"></div>
                    <span>{rating} & up</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="text-lg font-bold mb-5">Level</h3>
              <div className="flex flex-col gap-3">
                {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
                  (level) => (
                    <div
                      key={level}
                      className="flex items-center gap-3 text-[#888] text-[0.95rem] cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="w-[18px] h-[18px] border border-white/20 rounded bg-white/5"></div>
                      <span>{level}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
          {/* Course Listings */}
          <section>
            <div className="flex justify-between items-center mb-8 p-4 bg-white/2 border border-white/5 rounded-xl">
              <span className="text-[#888] text-sm">
                {courses.length} results found
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[#888] text-sm">Sort by:</span>
                <select className="bg-transparent text-white border-none font-semibold text-sm cursor-pointer outline-none">
                  <option className="bg-[#141414]">Most Popular</option>
                  <option className="bg-[#141414]">Highest Rated</option>
                  <option className="bg-[#141414]">Newest</option>
                  <option className="bg-[#141414]">Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course: any, index) => (
                <div
                  key={course.id || course._id || index}
                  className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:bg-white/2 hover:border-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <div className="relative h-[180px] w-full">
                    <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider text-white border border-white/10 z-10">
                      Programming
                    </span>
                    {/* <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div className="p-5">
                    <h3 className="text-[1.1rem] font-bold mb-2 leading-tight h-12 line-clamp-2 overflow-hidden">
                      {course.title}
                    </h3>
                    <p className="text-[0.85rem] text-[#888] mb-4">
                      {course.instructor.name}
                    </p>

                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="font-bold text-[#ffb800] text-[0.95rem]">
                        5.0
                      </span>
                      <div className="flex text-[#ffb800] text-[0.8rem]">
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                      </div>
                      <span className="text-[#666] text-[0.85rem]">
                        (1250 reviews)
                      </span>
                    </div>

                    <div className="flex gap-3 text-[#666] text-[0.8rem] mb-5">
                      <span>24 hours</span>
                      <span>•</span>
                      <span>Beginner</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-white">
                          ${course.price}
                        </span>
                        <span className="text-sm text-[#666] line-through">
                          $1000
                        </span>
                      </div>
                      <Link
                        href={`/courses/${course._id}`}
                        className="bg-transparent border border-white/10 px-3 py-1.5 rounded-lg text-white text-[0.8rem] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="p-16 text-center border-t border-white/5 text-[#666] mt-16">
        <p>&copy; 2026 E-Platform Learning. Premium Educational Experience.</p>
      </footer>
    </div>
  );
}
