import { Typography } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingCourseOwnerPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="h-fit w-full bg-accent  ">
        <div className="m-auto max-w-[1500px]  p-8">
          <div className="flex flex-col max-md:gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="px-2 max-md:self-center md:order-last">
                <Skeleton className="my-auto size-24 rounded-md md:size-36" />
              </div>

              <Skeleton className="h-8 w-full grow md:w-1/2" />

              <Skeleton className="h-8 w-full md:w-[150px]" />
            </div>
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

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
                <Skeleton key={index} className="m-2 h-11 w-full " />
              ))}
            </ul>
          </div>
          <Skeleton className="h-8 w-full md:w-[150px] md:self-end" />
        </div>
      </div>
    </div>
  );
}
