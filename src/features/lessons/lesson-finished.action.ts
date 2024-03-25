"use server";

import { prisma } from "@/lib/prisma";
import { authentificatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const lessonFinished = authentificatedAction(
  z.object({
    courseId: z.string(),
    lessonId: z.string(),
  }),
  async (props, { userId }) => {
    const lessonOnUser = await prisma.lessonOnUser.findFirst({
      where: {
        lessonId: props.courseId,
        userId,
      },
    });

    if (!lessonOnUser) {
      const lesson = await prisma.lessonOnUser.create({
        data: {
          lessonId: props.lessonId,
          userId,
          progress: "COMPLETED",
        },
      });

      return { message: "La leçon a été marquée comme terminée", lesson };
    }

    const lesson = await prisma.lessonOnUser.update({
      where: {
        id: lessonOnUser.id,
      },
      data: {
        progress: "COMPLETED",
      },
    });

    return { message: "La leçon a été marquée comme terminée", lesson };
  }
);
