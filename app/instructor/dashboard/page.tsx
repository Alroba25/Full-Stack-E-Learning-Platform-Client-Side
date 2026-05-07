"use client";

// ─── UI Primitives ────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteCourse,
  getInstrucortCoursesUsers,
  getInstructorCourses,
} from "@/Lib";
import CreateCourseForm from "./CreateCourseForm";
import TabsComponent from "@/components/Taps";
import StatusOverView from "@/components/StatusOverView";
// =============================================================================
// Component
// =============================================================================
export default function InstructorDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // ── Data Fetching ─────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    const [coursesRes, usersRes] = await Promise.all([
      getInstructorCourses(),
      getInstrucortCoursesUsers(),
    ]);
    if (coursesRes?.courses) setCourses(coursesRes.courses);
    if (usersRes?.students) setUsers(usersRes.students);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCourseCreated = useCallback(
    (newCourses: any[]) => {
      // If API returns updated list, use it; otherwise refetch
      if (newCourses?.length > 0) {
        setCourses(newCourses);
      } else {
        fetchData();
      }
      setIsDialogOpen(false);
    },
    [fetchData],
  );

  const openDeleteDialog = useCallback(
    (courseId: string, courseTitle: string) => {
      setCourseToDelete({ id: courseId, title: courseTitle });
    },
    [],
  );

  const confirmDelete = useCallback(async () => {
    if (!courseToDelete) return;
    setIsDeleting(courseToDelete.id);
    try {
      const res = await deleteCourse(courseToDelete.id, router);
      if (res) {
        setCourses((prev) => prev.filter((c) => c._id !== courseToDelete.id));
        toast.success("Course deleted successfully!");
      }
    } finally {
      setIsDeleting(null);
      setCourseToDelete(null);
    }
  }, [courseToDelete, router]);

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="mb-5 text-[#a0a0a0] font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors z-20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent pb-1">
            Instructor Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses, track student progress, and monitor your
            earnings.
          </p>
        </div>

        {/* ── Create Course Dialog ─────────────────────────────────────── */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all rounded-full px-6"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Course
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col sm:max-w-[680px] h-[90vh] p-0 gap-0 overflow-hidden">
            {isDialogOpen && (
              <CreateCourseForm
                onSuccess={handleCourseCreated}
                onClose={() => setIsDialogOpen(false)}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Stats Overview ─────────────────────────────────────────────────── */}
      <StatusOverView users={users} courses={courses} />

      {/* ── Main Tabs ──────────────────────────────────────────────────────── */}
      <TabsComponent
        users={users}
        courses={courses}
        isDeleting={isDeleting}
        openDeleteDialog={openDeleteDialog}
        setIsDialogOpen={setIsDialogOpen}
      />
      <Dialog
        open={!!courseToDelete}
        onOpenChange={(open) => !open && setCourseToDelete(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-destructive">
              Delete Course
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{courseToDelete?.title}&rdquo;
              </span>{" "}
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-2 bg-black/9">
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => setCourseToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl"
              disabled={!!isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
