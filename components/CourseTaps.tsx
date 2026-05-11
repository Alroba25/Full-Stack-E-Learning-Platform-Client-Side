import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Users,
  DollarSign,
  BarChart,
  BookOpen,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface CourseTapsProps {
  courses: any[];
  isDeleting: string | null;
  openDeleteDialog: (id: string, title: string) => void;
  setIsDialogOpen: (open: boolean) => void;
}

export const CourseTaps = ({
  courses,
  isDeleting,
  openDeleteDialog,
  setIsDialogOpen,
}: CourseTapsProps) => {
  return (
    <>
      {courses.length > 0 ? (
        <TabsContent
          value="courses"
          className="space-y-6 focus-visible:outline-none focus-visible:ring-0"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <Card
                key={course._id}
                className="overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 border-border/50 dark:bg-zinc-900/30 rounded-2xl"
              >
                {/* Cover */}
                <div className="h-48 relative overflow-hidden bg-muted">
                  <img
                    src={course?.imageUrl || "/Darsfiy-cover-course.png"}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {course.category && (
                      <span className="backdrop-blur-md bg-black/40 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md border border-white/10">
                        {course.category}
                      </span>
                    )}
                    {course.level && (
                      <span className="backdrop-blur-md bg-blue-500/40 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md border border-blue-400/20">
                        {course.level}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-sm font-medium text-white backdrop-blur-md bg-black/30 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {course.rating || "New"}
                  </div>
                </div>

                {/* Info */}
                <CardHeader className="flex-1 pt-5">
                  <CardTitle className="line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-xl">
                    <Link href={`/courses/${course._id}`}>{course.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {course.students?.length ?? 0} Students
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="w-4 h-4" />
                      {course.isFree ? "Free" : (course.price ?? "0")}
                    </span>
                  </CardDescription>
                </CardHeader>

                {!course.published && (
                  <div className="px-6 pb-4">
                    <div className="flex justify-between text-xs mb-2 text-muted-foreground font-medium">
                      <span>Course Completion</span>
                      <span>{course.progress ?? 0}%</span>
                    </div>
                    <Progress
                      value={course.progress ?? 0}
                      className="h-2 rounded-full"
                    />
                  </div>
                )}

                <CardFooter className="border-t bg-black/90 pt-4 mt-auto gap-3">
                  <Button
                    variant="destructive"
                    disabled={isDeleting === course._id}
                    onClick={() => openDeleteDialog(course._id, course.title)}
                    className="w-full rounded-xl"
                  >
                    {isDeleting === course._id
                      ? "Deleting..."
                      : "Delete Course"}
                  </Button>
                  {course.published && (
                    <Button
                      variant="delete"
                      size="icon"
                      className="rounded-xl shrink-0"
                    >
                      <BarChart className="w-4 h-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      ) : (
        <TabsContent
          value="courses"
          className="space-y-6 focus-visible:outline-none focus-visible:ring-0"
        >
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border/60 rounded-3xl bg-muted/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 ring-8 ring-blue-500/5">
              <BookOpen className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No courses yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-8 px-4">
              You haven&apos;t created any courses yet. Start sharing your
              knowledge with the world today!
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full px-8 shadow-lg shadow-blue-500/20"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Course
            </Button>
          </div>
        </TabsContent>
      )}
    </>
  );
};
