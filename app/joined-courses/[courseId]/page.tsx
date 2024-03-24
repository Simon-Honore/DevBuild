import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { CourseHeader } from "@/features/courses/CourseHeader";
import { CreatorCard } from "@/features/courses/CreatorCard";
import {
  LessonInCourseJoined,
  getOneCourseJoined,
} from "@/features/courses/joined-courses.query";
import { getRequiredAuthSession } from "@/lib/auth";
import { CheckCircle, CircleDot, CircleDotDashed } from "lucide-react";
import Link from "next/link";
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

  const lessonProgressIcon = (progress: LessonInCourseJoined["progress"]) => {
    if (progress === "NOT_STARTED") {
      return <CircleDotDashed className="stroke-muted-foreground" />;
    }

    if (progress === "IN_PROGRESS") {
      return <CircleDot className="stroke-sky-600" />;
    }

    return <CheckCircle className="stroke-emerald-600" />;
  };

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
            <ul className="flex flex-col divide-y px-4">
              {course.lessons.map((lesson) => (
                <Link
                  href={"#"}
                  key={lesson.id}
                  className="rounded hover:bg-accent"
                >
                  <li className="flex items-center gap-2 p-2">
                    {lessonProgressIcon(lesson.progress)}
                    <Typography variant={"large"}>{lesson.name}</Typography>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <CreatorCard creator={course.creator} />
      </div>
    </div>
  );
}
