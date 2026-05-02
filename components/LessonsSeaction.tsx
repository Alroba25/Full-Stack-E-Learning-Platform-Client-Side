import { ChevronRight } from "lucide-react";
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
              className="border-b border-white/5 last:border-0 p-4 bg-black hover:bg-white/3 transition-colors flex justify-between items-center group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <ChevronRight
                  size={18}
                  className="text-white/40 group-hover:rotate-90 transition-transform"
                />
                <span className="font-bold">{section.title}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
