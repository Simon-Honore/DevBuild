"use server";

import { prisma } from "@/lib/prisma";
import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";

const courseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const editCourseAction = authentificatedAction(
  courseActionEditProps,
  async (props, { userId }) => {
    const course = await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });

    return { message: "Le cours a été mis à jour", course };
  }
);

export const createCourseAction = authentificatedAction(
  CourseFormSchema,
  async (props, { userId }) => {
    const course = await prisma.course.create({
      data: { ...props, creatorId: userId },
    });

    return { message: "Le cours à été créé avec succès", course };
  }
);
