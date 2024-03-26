import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type GetAllCoursesProps = {
  userPage: number;
  itemsPerPage: number;
  userId?: string;
};

export const getAllCourses = async ({
  userPage,
  itemsPerPage,
  userId,
}: GetAllCoursesProps) => {
  const where = {
    state: "PUBLISHED" as Prisma.EnumStateFilter<"Course">,
    NOT: {
      creatorId: userId,
    },
  };

  const [count, data] = await prisma.$transaction([
    prisma.course.count({
      where,
    }),
    prisma.course.findMany({
      where,
      select: {
        id: true,
        name: true,
        image: true,
        presentation: true,
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
      take: itemsPerPage,
      skip: Math.max(0, (userPage - 1) * itemsPerPage),
    }),
  ]);

  return { count, data };
};

type GetAllCourses = Prisma.PromiseReturnType<typeof getAllCourses>;
export type CoursesCard = GetAllCourses["data"][number];

export const getOneCourse = async (courseId: string) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
      state: "PUBLISHED",
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      createdAt: true,
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      users: {
        select: {
          id: true,
        },
      },
      lessons: {
        where: {
          state: "PUBLISHED",
        },
        select: {
          rank: true,
          name: true,
          id: true,
        },
        orderBy: {
          rank: "asc",
        },
      },
    },
  });
};

export type GetOneCourse = Prisma.PromiseReturnType<typeof getOneCourse>;
