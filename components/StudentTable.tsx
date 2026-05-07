"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users } from "lucide-react";
import { IStudent } from "@/Interfaces";

export const StudentTable = ({ users }: { users: any[] }) => {
  return users.length > 0 ? (
    <TabsContent
      value="students"
      className="focus-visible:outline-none focus-visible:ring-0"
    >
      <Card className="shadow-sm border-border/50 dark:bg-zinc-900/30 rounded-2xl overflow-hidden">
        <CardHeader className="bg-muted/20 border-b border-border/50 pb-6">
          <CardTitle className="text-xl">Recent Enrollments</CardTitle>
          <CardDescription>
            Monitor the students who have recently enrolled in your courses.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 hover:bg-muted/10 border-none">
                  <TableHead className="py-4 pl-6">Student</TableHead>
                  <TableHead className="py-4">Course</TableHead>
                  <TableHead className="py-4">Enrollment Date</TableHead>
                  <TableHead className="py-4">Progress</TableHead>
                  <TableHead className="py-4 text-right pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((student: IStudent, idx: number) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-muted/30 border-border/50 transition-colors"
                  >
                    {/* Avatar + Name */}
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                          {student.user?.image && (
                            <img
                              src={student.user.image}
                              alt={student.user?.name ?? "Student"}
                              className="w-full h-full object-cover rounded-full"
                              loading="lazy"
                            />
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {student.user?.name ?? "Unknown"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {student.user?.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Course */}
                    <TableCell className="py-4 text-sm font-medium text-muted-foreground">
                      {student.course?.title ?? "Enrolled"}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      <Badge
                        variant="outline"
                        className="font-normal rounded-full bg-background"
                      >
                        {student.createdAt
                          ? new Date(student.createdAt).toLocaleDateString()
                          : "Recently"}
                      </Badge>
                    </TableCell>

                    {/* Progress */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Progress
                          value={student.progress}
                          className="h-2 w-[80px]"
                        />
                        <span className="text-xs font-medium w-8">
                          {student.progress}%
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  ) : (
    <TabsContent
      value="students"
      className="space-y-6 focus-visible:outline-none focus-visible:ring-0"
    >
      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border/60 rounded-3xl bg-muted/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-8 ring-emerald-500/5">
          <Users className="h-10 w-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No students yet</h3>
        <p className="text-muted-foreground text-center max-w-sm px-4">
          Once students enroll in your courses, you&apos;ll be able to track
          their progress and manage their learning journey right here.
        </p>
      </div>
    </TabsContent>
  );
};
