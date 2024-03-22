import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type GetCoursesExploreProps = {
  userPage: number;
  itemsPerPage: number;
  userId?: string;
};

export const getCoursesExplore = async ({
  userPage,
  itemsPerPage,
  userId,
}: GetCoursesExploreProps) => {
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

type GetCoursesExplore = Prisma.PromiseReturnType<typeof getCoursesExplore>;
export type CoursesCardExplore = GetCoursesExplore["data"][number];
