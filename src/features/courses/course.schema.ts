import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(60),
  image: z.string().url(),
  presentation: z.string().min(3),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;
