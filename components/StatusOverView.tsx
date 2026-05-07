import { useMemo } from "react";
import { BookOpen, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function StatusOverView({courses,users}:any) {
  // ── Derived Stats ─────────────────────────────────────────────────────────
  const stats = useMemo(
    () => [
      {
        label: "Total Courses",
        value: courses.length,
        sub: "+2 from last month",
        subColor: "text-emerald-500",
        icon: <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-l-blue-500",
      },
      {
        label: "Total Students",
        value: users.length,
        sub: "+180 from last month",
        subColor: "text-emerald-500",
        icon: (
          <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        ),
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        border: "border-l-emerald-500",
      },
      {
        label: "Total Revenue",
        value: "$12,450",
        sub: "+12% from last month",
        subColor: "text-emerald-500",
        icon: (
          <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        ),
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        border: "border-l-indigo-500",
      },
      {
        label: "Average Rating",
        value: "4.8",
        sub: "Based on 843 reviews",
        subColor: "text-amber-500",
        icon: <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        border: "border-l-amber-500",
      },
    ],
    [courses.length, users.length],
  );
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`border-l-4 ${stat.border} shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900/50`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <div
              className={`h-8 w-8 rounded-full ${stat.iconBg} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className={`text-xs mt-1 font-medium ${stat.subColor}`}>
              {stat.sub}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
