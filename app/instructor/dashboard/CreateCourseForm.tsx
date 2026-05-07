"use client";

// ─── UI ──────────────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Icons ────────────────────────────────────────────────────────────────────
import { FileText, ListOrdered, Plus, Trash2, Video } from "lucide-react";

// ─── React & Form ────────────────────────────────────────────────────────────
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseFormValues } from "@/Schema";
import { createCourse } from "@/Lib";
import { toast } from "sonner";

// ─── Constants ───────────────────────────────────────────────────────────────
const DEFAULT_LESSON = { title: "", videoUrl: "", content: "", order: 1 };
const DEFAULT_VALUES: CourseFormValues = {
  title: "",
  description: "",
  isFree: false,
  price: 0,
  imageUrl: "",
  lessons: [DEFAULT_LESSON],
};

interface Props {
  onSuccess: (courses: any[]) => void;
  onClose: () => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}

export default function CreateCourseForm({
  onSuccess,
  onClose,
  isCreating,
  setIsCreating,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  // Watchers — scoped to this component only, no parent re-renders
  const watchedTitle = watch("title");
  const watchedDescription = watch("description");
  const watchedImage = watch("imageUrl");
  const isFree = watch("isFree");

  const showLessons =
    watchedTitle?.length >= 3 &&
    watchedDescription?.length >= 10 &&
    watchedImage?.length > 5;

  const addLesson = () =>
    append({ ...DEFAULT_LESSON, order: fields.length + 1 });

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    setIsCreating(true);
    try {
      const res = await createCourse(data);
      if (res) {
        // Lib already handles the success toast, we just need to update UI
        reset(DEFAULT_VALUES);
        onSuccess(res.courses ?? []);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <DialogHeader className="px-6 py-5 shrink-0 border-b">
        <DialogTitle className="text-2xl font-bold">
          Create New Course
        </DialogTitle>
        <DialogDescription>
          Fill in the details below, then add your lessons.
        </DialogDescription>
      </DialogHeader>

      {/* Scrollable Body */}
      <ScrollArea className="flex-1 min-h-0">
        <form
          id="course-form"
          onSubmit={handleSubmit(onSubmit as any)}
          className="px-6 py-5 space-y-8"
        >
          {/* ── Course Information ─────────────────────────────── */}
          <section className="space-y-5">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
              Course Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  placeholder="e.g. Advanced React Patterns"
                  {...register("title")}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Is Free Toggle */}
              <div className="space-y-2">
                <Label htmlFor="course-is-free">Course Type</Label>
                <select
                  id="course-is-free"
                  {...register("isFree", {
                    setValueAs: (v) => v === "true",
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="false" className="bg-zinc-950 text-white">
                    Paid
                  </option>
                  <option value="true" className="bg-zinc-950 text-white">
                    Free
                  </option>
                </select>
              </div>

              {/* Price — hidden when isFree */}
              {!isFree && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-price">Price ($)</Label>
                  <Input
                    id="course-price"
                    type="number"
                    placeholder="0"
                    {...register("price", { valueAsNumber: true })}
                    className={errors.price ? "border-destructive" : ""}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="course-image">Course Image URL</Label>
              <Input
                id="course-image"
                placeholder="https://example.com/image.jpg"
                {...register("imageUrl")}
                className={errors.imageUrl ? "border-destructive" : ""}
              />
              {errors.imageUrl && (
                <p className="text-xs text-destructive">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                placeholder="Tell students what they will learn..."
                rows={4}
                {...register("description")}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>

          {/* ── Lessons Section ────────────────────────────────── */}
          {showLessons ? (
            <section className="space-y-5 border-t pt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                  Lessons
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLesson}
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Lesson
                </Button>
              </div>

              {errors.lessons && typeof errors.lessons === "string" && (
                <p className="text-sm text-destructive">{errors.lessons}</p>
              )}

              <Accordion
                type="multiple"
                defaultValue={[fields[0]?.id]}
                className="space-y-3"
              >
                {fields.map((field, index) => (
                  <AccordionItem
                    key={field.id}
                    value={field.id}
                    className="border rounded-xl bg-muted/20 px-4 overflow-hidden"
                  >
                    {/* Lesson Header Row */}
                    <div className="flex items-center gap-2 py-1">
                      <AccordionTrigger className="flex-1 py-3 hover:no-underline gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm truncate max-w-[240px]">
                            {watch(`lessons.${index}.title`) ||
                              `Lesson ${index + 1}`}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                        aria-label="Remove lesson"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Lesson Fields */}
                    <AccordionContent className="pb-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Lesson Title */}
                        <div className="sm:col-span-2 space-y-2">
                          <Label className="text-xs">Lesson Title</Label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="e.g. Introduction"
                              className={`pl-9 ${
                                errors.lessons?.[index]?.title
                                  ? "border-destructive"
                                  : ""
                              }`}
                              {...register(`lessons.${index}.title`)}
                            />
                          </div>
                          {errors.lessons?.[index]?.title && (
                            <p className="text-[11px] text-destructive">
                              {errors.lessons[index].title?.message}
                            </p>
                          )}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                          <Label className="text-xs">Order</Label>
                          <div className="relative">
                            <ListOrdered className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              className="pl-9"
                              {...register(`lessons.${index}.order`, {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Video URL */}
                      <div className="space-y-2">
                        <Label className="text-xs">Video URL</Label>
                        <div className="relative">
                          <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://youtube.com/watch?v=..."
                            className={`pl-9 ${
                              errors.lessons?.[index]?.videoUrl
                                ? "border-destructive"
                                : ""
                            }`}
                            {...register(`lessons.${index}.videoUrl`)}
                          />
                        </div>
                        {errors.lessons?.[index]?.videoUrl && (
                          <p className="text-[11px] text-destructive">
                            {errors.lessons[index].videoUrl?.message}
                          </p>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <Label className="text-xs">Content / Description</Label>
                        <Textarea
                          placeholder="What will students learn in this lesson?"
                          rows={3}
                          className={
                            errors.lessons?.[index]?.content
                              ? "border-destructive"
                              : ""
                          }
                          {...register(`lessons.${index}.content`)}
                        />
                        {errors.lessons?.[index]?.content && (
                          <p className="text-[11px] text-destructive">
                            {errors.lessons[index].content?.message}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ) : (
            /* Placeholder until course info is complete */
            <div className="border-t pt-6">
              <div className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed rounded-xl text-center text-muted-foreground bg-muted/10 animate-in fade-in duration-300">
                <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-5 w-5 opacity-40" />
                </div>
                <p className="font-medium text-sm">Lessons will appear here</p>
                <p className="text-xs max-w-[260px] opacity-70">
                  Complete the Course Title, Description, and Image URL above to
                  unlock lesson creation.
                </p>
              </div>
            </div>
          )}
        </form>
      </ScrollArea>

      {/* Fixed Footer */}
      <DialogFooter className="px-6 py-4 shrink-0 border-t bg-muted/10 gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isCreating}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" form="course-form" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Course"}
        </Button>
      </DialogFooter>
    </>
  );
}
