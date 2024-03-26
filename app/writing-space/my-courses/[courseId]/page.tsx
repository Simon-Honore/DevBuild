import { SubmitButton } from "@/components/form/SubmitButton";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DateLongFormat, capitalizeFirstChar } from "@/lib/utils";
import { PenLine } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { AdminLessonSortable } from "./AdminLessonSortable";
import { getCourseLessons } from "./lessons.query";

export default async function OwnerCoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourseLessons({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <div className="h-fit w-full bg-accent  ">
        <div className="m-auto max-w-[1500px]  p-8">
          <div className="flex flex-col max-md:gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="px-2 max-md:self-center md:order-last">
                <Avatar className="my-auto size-24 rounded-md md:size-36">
                  <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                  {course.image ? (
                    <AvatarImage src={course.image} alt="image du cours" />
                  ) : null}
                </Avatar>
              </div>

              <Typography variant={"h1"} className="grow">
                {capitalizeFirstChar(course.name ?? "")}
              </Typography>
            </div>
            <Typography variant={"muted"} className="self- flex items-center">
              <PenLine className="mr-2 size-4" />
              {DateLongFormat(course.createdAt as Date)}
            </Typography>
          </div>
        </div>
      </div>

      <div className="container flex gap-16 py-10 max-md:flex-col md:px-20">
        <div className="flex grow flex-col gap-6">
          <Typography>{course.presentation}</Typography>

          <div className="flex flex-col gap-4">
            <Typography variant={"h2"}>Leçons</Typography>
            <AdminLessonSortable items={course.lessons} />
            <form className="self-end pt-4 max-md:w-full">
              <SubmitButton
                size="sm"
                className=" max-md:w-full"
                formAction={async () => {
                  "use server";

                  const session = await getRequiredAuthSession();

                  const courseId = params.courseId;

                  // Authorize the user
                  await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  const lesson = await prisma.lesson.create({
                    data: {
                      name: "Brouillon",
                      rank: "aaaaa",
                      state: "DRAFT",
                      courseId: courseId,
                      content: "## Contenu par default",
                    },
                  });

                  redirect(
                    `/writing-space/my-courses/${courseId}/lessons/${lesson.id}`
                  );
                }}
              >
                Créer une leçon
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
