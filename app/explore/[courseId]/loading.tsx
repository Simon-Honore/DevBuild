import { Typography } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseHeaderSkeleton } from "@/features/courses/CourseHeaderSkleton";
import { CreatorCardSkeleton } from "@/features/courses/explore/CreatorCardSkeleton";

export default async function LoadingCoursePresentationPage() {
  return (
    <div className="flex w-full flex-col">
      <CourseHeaderSkeleton>
        <div className="md:px-10">
          <Skeleton className="h-9 w-36" />
        </div>
      </CourseHeaderSkeleton>

      <div className="container flex gap-16 py-10 max-md:flex-col md:px-20">
        <div className="flex grow flex-col gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant={"h2"}>Leçons</Typography>
            <ul className="flex flex-col divide-y px-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="m-2 h-11 w-96" />
              ))}
            </ul>
          </div>
        </div>

        <CreatorCardSkeleton />
      </div>
    </div>
  );
}
