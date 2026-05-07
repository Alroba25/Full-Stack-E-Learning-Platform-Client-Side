"use client";
import { getAllCourses } from "@/Lib";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeCoursesSeaction() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getAllCourses();
      // Safeguard: Extract array if data is an object like { courses: [...] }
      setCourses(Array.isArray(data) ? data : data?.courses || []);
    };
    fetchCourses();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {courses.map((course: any) => (
        <div
          key={course._id}
          className="bg-white/2 border border-white/5 rounded-[20px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(138,43,226,0.1)] hover:border-white/15 backdrop-blur-md group transition-all"
        >
          <div className="relative h-[220px] w-full overflow-hidden">
            <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 z-10">
              Web Development
            </span>
            <Image
              src={course.imageUrl || "/Darsfiy-cover-course.png"}
              alt={course.title || "Course"}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white leading-snug">
              {course.title || "Untitled Course"}
            </h3>
            <div className="text-[#888] text-sm mb-6 flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {course.instructor?.name || "Instructor"}
            </div>
            <div className="flex justify-between items-center pt-6 border-top border-white/5">
              <div className="flex gap-4 text-[#a0a0a0] text-[0.85rem]">
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  24h
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  4.9
                </div>
              </div>
              <div className="font-bold text-[1.2rem] text-[#00f2fe]">
                {course.price === 0 ? "Free" : "$" + course.price}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
