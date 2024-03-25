import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getOwnerCourse } from "@/features/courses/edit/owner-courses.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { DateLongFormat, capitalizeFirstChar } from "@/lib/utils";
import { PenLine } from "lucide-react";
import { notFound } from "next/navigation";

export default async function OwnerCoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const course = await getOwnerCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <div className="h-fit w-full bg-secondary  ">
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

          <div className="flex flex-col gap-2">
            <Typography variant={"h2"}>Leçons</Typography>
            <ul className="flex flex-col divide-y px-4">
              {course.lessons?.map((lesson) => (
                <li key={lesson.id} className="p-2">
                  <Typography variant={"large"}>{lesson.name}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
