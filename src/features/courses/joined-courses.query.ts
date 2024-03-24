import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCoursesJoined = async (userId: string) => {
  return await prisma.course.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
      creatorId: {
        not: userId,
      },
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      creator: {
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

export type GetCoursesJoined = Prisma.PromiseReturnType<
  typeof getCoursesJoined
>[number];
