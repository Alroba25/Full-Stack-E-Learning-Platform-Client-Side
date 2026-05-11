import { z } from "zod";
const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  videoUrl: z.string().url("Must be a valid video URL"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  order: z.number().min(1),
});
export const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isFree: z.boolean().default(false),
  price: z
    .preprocess(
      (v) => {
        const n = Number(v);
        return isNaN(n) ? 0 : n;
      },
      z.number().min(0, "Price must be 0 or more"),
    )
    .default(0),
  imageUrl: z.string().url("Must be a valid image URL"),
  category: z.enum(
    ["Programming", "Data Science", "Design", "Business", "Marketing"],
    { message: "Please select a category" },
  ),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Please select a level",
  }),
  lessons: z.array(lessonSchema).min(1, "At least one lesson is required"),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
