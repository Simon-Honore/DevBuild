import { Typography } from "@/components/ui/Typography";
import { capitalizeFirstChar, cn } from "@/lib/utils";
import Link from "next/link";
import { CourseJoined } from "../courses/joined-courses.query";
import { LessonProgressIcon } from "./LessonProgressIcon";

type LessonsListProps = {
  course: CourseJoined;
  lessonActive?: string;
};

export const LessonsList = ({ course, lessonActive }: LessonsListProps) => {
  return (
    <ul className="flex flex-col divide-y px-4">
      {course.lessons.map((lesson) => (
        <Link
          href={`/joined-courses/${course.id}/lessons/${lesson.id}`}
          key={lesson.id}
          className="rounded hover:bg-accent"
        >
          <li
            className={cn("flex items-center gap-2 p-2", {
              "bg-secondary": lessonActive === lesson.id,
            })}
          >
            {LessonProgressIcon(lesson.progress)}
            <Typography variant={"large"}>
              {capitalizeFirstChar(lesson.name)}
            </Typography>
          </li>
        </Link>
      ))}
    </ul>
  );
};
