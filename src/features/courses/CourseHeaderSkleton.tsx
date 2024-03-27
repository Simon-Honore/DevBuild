import { Skeleton } from "@/components/ui/skeleton";
import { PropsWithChildren } from "react";

export const CourseHeaderSkeleton = async ({ children }: PropsWithChildren) => {
  return (
    <div className="h-fit w-full bg-secondary  ">
      <div className="m-auto max-w-[1500px]  p-8">
        <div className="flex flex-col max-md:gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="px-2 max-md:self-center md:order-last">
              <Skeleton className="my-auto size-24 rounded-md md:size-36" />
            </div>

            <Skeleton className="h-8 w-full grow md:w-1/2" />

            {children}
          </div>
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};
