import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/features/auth/LoginButton";
import { CourseHeader } from "@/features/courses/CourseHeader";
import { CreatorCard } from "@/features/courses/explore/CreatorCard";
import { getOneCourse } from "@/features/courses/explore/courses.query";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

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

  const isUserFollowed = Boolean(
    course.users.find((user) => user.id === session?.user.id)
  );
  console.log({ isUserFollowed });

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

                  if (!isUserFollowed) {
                    redirect(`/courses-followed/${params.courseId}`);
                  }

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
                      `/courses-followed/${courseOnUser.course.id}/lessons/${lesson.id}`
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
