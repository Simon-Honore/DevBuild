import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getOneCourseOwner = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  return await prisma.course.findFirst({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      presentation: true,
      lessons: {
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          state: true,
          courseId: true,
          rank: true,
        },
      },
    },
  });
};

export type LessonOwner = NonNullable<
  Prisma.PromiseReturnType<typeof getOneCourseOwner>
>["lessons"][number];
