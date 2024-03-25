"use client";
import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { LessonInCourseJoined } from "../courses/joined-courses.query";

export type ButtonLessonCompletedProps = {
  courseId: string;
  lesson: LessonInCourseJoined;
};

export const ButtonLessonCompleted = async ({
  courseId,
  lesson,
}: ButtonLessonCompletedProps) => {
  const session = await getRequiredAuthSession();

  return (
    <form className="self-end">
      <Button
        disabled={lesson?.progress === "COMPLETED"}
        formAction={async () => {
          "use server";

          const lessonOnUserExisting = await prisma.lessonOnUser.findFirst({
            where: {
              lessonId: lesson.id,
              userId: session.user.id,
            },
          });

          const lessonOnUser = lessonOnUserExisting
            ? await prisma.lessonOnUser.update({
                where: {
                  id: lesson.id,
                },
                data: {
                  progress: "COMPLETED",
                },
              })
            : await prisma.lessonOnUser.create({
                data: {
                  lessonId: lesson.id,
                  userId: session.user.id,
                  progress: "COMPLETED",
                },
              });

          if (lessonOnUser) {
            toast.success("La leçon a été marquée comme terminée");
            revalidatePath(
              `/joined-courses/${courseId}/lessons/${lessonOnUser.id}`
            );
          }
        }}
      >
        Marqué comme terminé
      </Button>
    </form>
  );
};
