"use server";

import { prisma } from "@/lib/prisma";
import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { LessonDetailSchema } from "./lesson.schema";

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailSchema,
});

export const lessonActionEditDetails = authentificatedAction(
  LessonActionEditDetailsSchema,
  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return {
      message: "La leçon à été mise à jour avec succès",
      lesson,
    };
  }
);

const LessonActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessonActionEditContent = authentificatedAction(
  LessonActionEditContentSchema,
  async ({ lessonId, markdown }, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: {
        content: markdown,
      },
    });

    return {
      message: "La leçon à été mise à jour avec succès",
      lesson,
    };
  }
);
