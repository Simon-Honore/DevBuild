import { CircleDotDashed, CircleDot, CheckCircle } from "lucide-react";
import { LessonInCourseJoined } from "../courses/joined-courses.query";

export const LessonProgressIcon = (progress: LessonInCourseJoined["progress"]) => {
  if (progress === "NOT_STARTED") {
    return <CircleDotDashed className="stroke-muted-foreground" />;
  }

  if (progress === "IN_PROGRESS") {
    return <CircleDot className="stroke-sky-600" />;
  }

  return <CheckCircle className="stroke-emerald-600" />;
};
