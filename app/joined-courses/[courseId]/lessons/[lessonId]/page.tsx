import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseHeader } from "@/features/courses/CourseHeader";
import { getOneCourseJoined } from "@/features/courses/joined-courses.query";
import { LessonsList } from "@/features/lessons/LessonsList";
import MarkdownProse from "@/features/markdown/MarkdownProse";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

  const lesson = course.lessons.find((lesson) => lesson.id === params.lessonId);

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

        <TabsContent value="content" className="p-4">
          <MarkdownProse markdown={lesson?.content ?? ""} />
        </TabsContent>

        <TabsContent value="lessons" className="py-4">
          <LessonsList course={course} lessonActive={params.lessonId} />
        </TabsContent>
      </Tabs>

      {/* on desktop */}
      <div className="container flex gap-8 py-10 max-md:hidden">
        <div className="flex grow flex-col gap-10">
          <MarkdownProse markdown={lesson?.content ?? ""} />
          <form className="self-end">
            <Button
              disabled={lesson?.progress === "COMPLETED"}
              formAction={async () => {
                "use server";

                const lessonOnUser = await prisma.lessonOnUser.findFirst({
                  where: {
                    lessonId: params.lessonId,
                    userId: session.user.id,
                  },
                });

                const lesson = lessonOnUser
                  ? await prisma.lessonOnUser.update({
                      where: {
                        id: lessonOnUser.id,
                      },
                      data: {
                        progress: "COMPLETED",
                      },
                    })
                  : await prisma.lessonOnUser.create({
                      data: {
                        lessonId: params.lessonId,
                        userId: session.user.id,
                        progress: "COMPLETED",
                      },
                    });

                if (lesson) {
                  revalidatePath(
                    `/joined-courses/${course.id}/lessons/${lesson.id}`
                  );
                }
              }}
            >
              Marqué comme terminé
            </Button>
          </form>
        </div>

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
