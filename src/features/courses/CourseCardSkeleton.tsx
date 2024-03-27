import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-stretch gap-6">
        <Skeleton className="my-auto size-24 rounded-md md:size-36" />
        <div className="flex grow flex-col gap-2 py-2">
          <Skeleton className="h-8 w-52" />

          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>

          <Skeleton className="h-6 w-full max-md:hidden" />
          <Skeleton className="h-6 w-3/4 max-md:hidden" />
        </div>
      </CardContent>
    </Card>
  );
};
