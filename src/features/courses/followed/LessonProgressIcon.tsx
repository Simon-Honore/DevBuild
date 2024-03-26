import { CheckCircle, CircleDot, CircleDotDashed } from "lucide-react";
import { LessonInCourseFollowed } from "./courses.query";

export const LessonProgressIcon = (
  progress: LessonInCourseFollowed["progress"]
) => {
  if (progress === "NOT_STARTED") {
    return <CircleDotDashed className="stroke-muted-foreground" />;
  }

  if (progress === "IN_PROGRESS") {
    return <CircleDot className="stroke-sky-600" />;
  }

  return <CheckCircle className="stroke-emerald-600" />;
};
