import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRequiredAuthSession } from "@/lib/auth";
import { DateLongFormat, capitalizeFirstChar } from "@/lib/utils";
import { PenLine } from "lucide-react";
import { PropsWithChildren } from "react";

type CourseHeaderProps = {
  course: {
    name: string;
    createdAt: Date;
    image: string | null;
  };
};

export const CourseHeader = async ({
  course,
  children,
}: PropsWithChildren & CourseHeaderProps) => {
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
