import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { CourseHeader } from "@/features/courses/explore/CourseHeader";
import { CreatorCard } from "@/features/courses/explore/CreatorCard";
import { getOneCourseJoined } from "@/features/courses/joined-courses.query";
import { LessonsList } from "@/features/lessons/LessonsList";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function JoinedCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await getOneCourseJoined({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <CourseHeader course={course}>
        <div className="md:px-10">
          <Button>Continuer</Button>
        </div>
      </CourseHeader>

      <div className="container flex gap-16 py-10 max-md:flex-col md:px-20">
        <div className="flex grow flex-col gap-6">
          <Typography>{course.presentation}</Typography>

          <div className="flex flex-col gap-2">
            <Typography variant={"h2"}>Leçons</Typography>
            <LessonsList course={course} />
          </div>
        </div>

        <CreatorCard creator={course.creator} />
      </div>
    </div>
  );
}
