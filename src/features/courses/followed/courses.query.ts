import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllCoursesFollowed = async (userId: string) => {
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

export type GatAllCoursesFollowed = Prisma.PromiseReturnType<
  typeof getAllCoursesFollowed
>[number];

export type GetOneCourseFollowedProps = {
  courseId: string;
  userId: string;
};

export const getOneCourseFollowed = async ({
  courseId,
  userId,
}: GetOneCourseFollowedProps) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      presentation: true,
      image: true,
      createdAt: true,
      users: {
        where: {
          userId,
        },
        select: {
          userId: true,
          canceledAt: true,
        },
      },
      lessons: {
        where: {
          state: "PUBLISHED",
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          state: true,
          name: true,
          courseId: true,
          content: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
          email: true,
          id: true,
        },
      },
      _count: {
        select: {
          lessons: true,
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map((lesson) => {
    const lessonProgress = lesson.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...lesson,
      progress: lessonProgress,
    };
  });

  return {
    ...course,
    isEnrolled: course.users.length > 0 && !course.users[0].canceledAt,
    isBanned: course.users.length > 0 && Boolean(course.users[0].canceledAt),
    isCreator: course.creator.id === userId,
    lessons,
  };
};

export type CourseFollowed = NonNullable<
  Prisma.PromiseReturnType<typeof getOneCourseFollowed>
>;

export type LessonInCourseFollowed = CourseFollowed["lessons"][0];
