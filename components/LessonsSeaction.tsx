import { ChevronRight, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourseLessons, getToken } from "@/Lib";

export default function LessonsSeaction({ id }: { id: string }) {
  const token = getToken();
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(lessons);
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchLessons = async () => {
      setIsLoading(true);
      try {
        const data = await getCourseLessons(id, router);
        setLessons(Array.isArray(data) ? data : data?.lessons || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [id, token, router]);
  return (
    <div className="space-y-6 font-sans">
      <h2 className="text-2xl font-extrabold font-heading">Course content</h2>
      <div className="border border-white/10 rounded-lg overflow-hidden">
        {Array.isArray(lessons) &&
          lessons.map((section: { title: string }, index: number) => (
            <div
              key={index}
              className="border-b border-white/5 last:border-0 p-4 bg-black/40 flex justify-between items-center select-none cursor-not-allowed opacity-50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <ChevronRight size={18} className="text-white/20" />
                <span className="font-semibold text-white/60 text-sm tracking-wide">{section?.title}</span>
              </div>
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/5 border border-white/5 text-white/60">
                <LockKeyhole size={20} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
