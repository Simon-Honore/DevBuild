import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHeaderSkeleton } from "@/features/courses/CourseHeaderSkleton";

export default async function LoadingLessonJoinedPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="flex w-full flex-col">
      <CourseHeaderSkeleton />

      {/* on mobile */}
      <Tabs defaultValue="content" className=" w-full md:hidden">
        <TabsList className="flex w-full gap-2 bg-secondary/50">
          <TabsTrigger value="content" className="w-full">
            Contenu
          </TabsTrigger>
          <TabsTrigger value="lessons" className="w-full">
            Leçons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="p-4">
          <Skeleton className="h-[400px] w-full" />
        </TabsContent>

        <TabsContent value="lessons" className="py-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="m-2 h-11 w-96" />
          ))}
        </TabsContent>
      </Tabs>

      {/* on desktop */}
      <div className="container flex gap-8 py-10 max-md:hidden">
        <div className="flex grow flex-col gap-10">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-8 w-[150px]" />
        </div>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Leçons</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="m-2 h-11 w-96" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
