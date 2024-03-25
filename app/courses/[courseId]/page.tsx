import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/features/auth/LoginButton";
import { CreatorCard } from "@/features/courses/CreatorCard";
import { getOneCourse } from "@/features/courses/courses.query";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DateLongFormat, capitalizeFirstChar } from "@/lib/utils";
import { PenLine } from "lucide-react";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { PropsWithChildren } from "react";

type CourseHeaderProps = {
  course: {
    name: string;
    createdAt: Date;
    image: string | null;
  };
};

const CourseHeader = async ({
  course,
  children,
}: PropsWithChildren<CourseHeaderProps>) => {
  const session = await getRequiredAuthSession();

  return (
    <div className="h-fit w-full bg-secondary  ">
      <div className="m-auto max-w-[1500px]  p-8">
        <div className="flex flex-col max-md:gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="px-2 max-md:self-center md:order-last">
              <Avatar className="my-auto size-24 rounded-md md:size-36">
                <AvatarFallback>{course.name[0]}</AvatarFallback>
                {course.image ? (
                  <AvatarImage src={course.image} alt="image du cours" />
                ) : null}
              </Avatar>
            </div>

            <Typography variant={"h1"} className="grow">
              {capitalizeFirstChar(course.name)}
            </Typography>

            {children}
          </div>
          <Typography variant={"muted"} className="self- flex items-center">
            <PenLine className="mr-2 size-4" />
            {DateLongFormat(course.createdAt)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default async function CoursePresentationPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getAuthSession();

  const course = await getOneCourse(params.courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <CourseHeader course={course}>
        <div className="md:px-10">
          {session ? (
            <form>
              <Button
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();
                  const courseOnUser = await prisma.courseOnUser.create({
                    data: {
                      courseId: params.courseId,
                      userId: session.user.id,
                    },
                    select: {
                      course: {
                        select: {
                          id: true,
                          lessons: {
                            where: {
                              state: "PUBLISHED",
                            },
                            take: 1,
                            select: {
                              id: true,
                            },
                          },
                        },
                      },
                    },
                  });
                  const lesson = courseOnUser.course.lessons[0];
                  revalidatePath(`/courses/${courseOnUser.course.id}`);

                  if (lesson) {
                    redirect(
                      `/joined-courses/${courseOnUser.course.id}/lessons/${lesson.id}`
                    );
                  }
                }}
              >
                rejoindre le cours
              </Button>
            </form>
          ) : (
            <LoginButton />
          )}
        </div>
      </CourseHeader>

      <div className="container flex gap-16 py-10 max-md:flex-col md:px-20">
        <div className="flex grow flex-col gap-6">
          <Typography>{course.presentation}</Typography>

          <div className="flex flex-col gap-2">
            <Typography variant={"h2"}>Leçons</Typography>
            <ul className="flex flex-col divide-y px-4">
              {course.lessons.map((lesson) => (
                <li key={lesson.id} className="p-2">
                  <Typography variant={"large"}>{lesson.name}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CreatorCard creator={course.creator} />
      </div>
    </div>
  );
}
