import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { capitalizeFirstChar } from "@/lib/utils";
import { CoursesCardExplore } from "./courses.query";

export type CourseCardProps = {
  course: CoursesCardExplore;
};

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-stretch gap-6">
        <Avatar className="my-auto size-24 rounded-md md:size-36">
          <AvatarFallback>{course.name[0]}</AvatarFallback>
          {course.image ? (
            <AvatarImage src={course.image} alt="image du cours" />
          ) : null}
        </Avatar>
        <div className="flex grow flex-col gap-2 py-2">
          <Typography variant={"h2"}>
            {capitalizeFirstChar(course.name)}
          </Typography>

          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback>{course.creator.name?.[0]}</AvatarFallback>
              {course.creator.image ? (
                <AvatarImage
                  src={course.creator.image}
                  alt={course.creator.name ?? "user picture"}
                />
              ) : null}
            </Avatar>
            <Typography variant={"muted"}>
              {course.creator.name ?? "Anonyme"}
            </Typography>
          </div>

          <Typography className="max-md:hidden">
            {course.presentation}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
