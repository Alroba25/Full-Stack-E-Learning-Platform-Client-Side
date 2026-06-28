"use client";
import {
  ChevronRight,
  Download,
  FileText,
  PlayCircle,
  Smartphone,
  Trophy,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CoursePursherCard({
  course,
  handleGetTheCourse,
  haveCourse,
  paymentStatus,
}: {
  course: any;
  handleGetTheCourse: any;
  haveCourse: boolean;
  paymentStatus: string;
}) {
  function getTimeAgo(dateString: string): string {
    if (!dateString) return "recently";
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "less than a minute";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)}mo`;
    return `${Math.floor(diffInSeconds / 31536000)}y`;
  }
  return (
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
              <span className="text-[#888] line-through text-lg">$149.99</span>
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
                href={`/learning?courseId=${course?._id}`}
                className="cursor-pointer group flex items-center justify-center gap-2 rounded-lg w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <span>Countinue the course</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                onClick={() => handleGetTheCourse(course?._id)}
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
                  href={`/learning?courseId=${course?._id}`}
                  className="cursor-pointer group flex items-center justify-center gap-2 rounded-lg w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] hover:shadow-[0_8px_25px_rgba(164,53,240,0.4)] text-white font-extrabold transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                  <span>Countinue the course</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : paymentStatus === "pending" ? (
                <div>
                  <button className="cursor-not-allowed w-full py-4 border-2 border-blue-400 text-blue-400 font-extrabold rounded-lg flex items-center justify-center">
                    Pending
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href={`/checkout?courseId=${course?._id}`}
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
              <span>{getTimeAgo(course?.updatedAt || "")} on-demand video</span>
            </li>
            <li className="flex items-center gap-3">
              <FileText size={16} />
              <span>{course?.articals?.length || 0} articles</span>
            </li>
            <li className="flex items-center gap-3">
              <Download size={16} />
              <span>
                {course?.resources?.length || 0} downloadable resources
              </span>
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
                    defaultValue={`https://darsfiy.vercel.app/courses/${course?._id}`}
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
  );
}
