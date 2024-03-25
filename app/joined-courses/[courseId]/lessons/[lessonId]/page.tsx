import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHeader } from "@/features/courses/CourseHeader";
import { getOneCourseJoined } from "@/features/courses/joined-courses.query";
import { LessonsList } from "@/features/lessons/LessonsList";
import { getRequiredAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function LessonJoinedPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await getOneCourseJoined({
    courseId: params.courseId,
    userId: session.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <CourseHeader course={course} />

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

        <TabsContent value="content">contenu</TabsContent>

        <TabsContent value="lessons" className="py-4">
          <LessonsList course={course} lessonActive={params.lessonId} />
        </TabsContent>
      </Tabs>

      {/* on desktop */}
      <div className="container flex gap-6 py-10">
        <div className="grow">contenu</div>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Leçons</CardTitle>
          </CardHeader>
          <CardContent>
            <LessonsList course={course} lessonActive={params.lessonId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
