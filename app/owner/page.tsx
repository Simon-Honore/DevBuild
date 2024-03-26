import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { capitalizeFirstChar } from "@/lib/utils";
import Link from "next/link";

export default async function CoursesOwnerPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  if (!courses[0]) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle className="uppercase">mes cours</LayoutTitle>
        </LayoutHeader>
        <LayoutActions>
          <Link href="/owner/create" className={buttonVariants()}>
            Créer un cours
          </Link>
        </LayoutActions>
        <LayoutContent>
          <Typography>Vous n&apos;avez pas encore de cours.</Typography>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">mes cours</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="/owner/create" className={buttonVariants()}>
          Créer un cours
        </Link>
      </LayoutActions>
      <LayoutContent>
        {courses.map((course) => (
          <Link key={course.id} href={`/owner/${course.id}`}>
            <Card>
              <CardContent className="flex items-center gap-6 md:items-stretch">
                <Avatar className="my-auto size-16 rounded-md md:size-24">
                  <AvatarFallback>{course.name[0]}</AvatarFallback>
                  {course.image ? (
                    <AvatarImage src={course.image} alt="image du cours" />
                  ) : null}
                </Avatar>
                <div className="flex grow flex-col gap-2 py-2">
                  <Typography variant={"h2"}>
                    {capitalizeFirstChar(course.name)}
                  </Typography>

                  <Typography className="max-md:hidden">
                    {course.presentation}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </LayoutContent>
    </Layout>
  );
}
