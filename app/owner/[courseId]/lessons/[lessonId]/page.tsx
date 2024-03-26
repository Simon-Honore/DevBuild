/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonDetail } from "../../../../../src/features/courses/owner/form/lesson/LessonDetailsForm";
import { getOneLessonOwner } from "../../../../../src/features/courses/owner/lesson.query";
import { MdxEditor } from "../../../../../src/features/markdown/mdxEditor/MdxEditor";

export default async function CourseLessonsPage({
  params,
}: {
  params: {
    lessonId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const lesson = await getOneLessonOwner(params.lessonId, session.user.id);

  if (!lesson) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
          })}
          href={`/writing-space/my-courses/${lesson.courseId}`}
        >
          Retour
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LessonDetail defaultValue={lesson} />
          </CardContent>
        </Card>
        <Card className="max-w-full flex-[3] overflow-auto">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <MdxEditor lessonId={lesson.id} markdown={lesson.content} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
