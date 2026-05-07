import { CourseTaps } from "./CourseTaps";
import { StudentTable } from "./StudentTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsComponentProps {
  users: any[];
  courses: any[];
  isDeleting: string | null;
  openDeleteDialog: (id: string, title: string) => void;
  setIsDialogOpen: (open: boolean) => void;
}

export default function TabsComponent({
  users,
  courses,
  isDeleting,
  openDeleteDialog,
  setIsDialogOpen,
}: TabsComponentProps) {
  return (
    <Tabs defaultValue="courses" className="space-y-6">
      <TabsList className="bg-muted/50 p-1 rounded-xl">
        <TabsTrigger
          value="courses"
          className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6"
        >
          My Courses
        </TabsTrigger>
        <TabsTrigger
          value="students"
          className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6"
        >
          Students Overview
        </TabsTrigger>
      </TabsList>

      {/* ── Courses Tab ──────────────────────────────────────────────────── */}
      <CourseTaps
        courses={courses}
        isDeleting={isDeleting}
        openDeleteDialog={openDeleteDialog}
        setIsDialogOpen={setIsDialogOpen}
      />

      {/* ── Students Tab ─────────────────────────────────────────────────── */}
      <StudentTable users={users} />
    </Tabs>
  );
};
