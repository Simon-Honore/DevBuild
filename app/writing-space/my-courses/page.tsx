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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
          <Link href="/writing-space/create" className={buttonVariants()}>
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
        <Link href="/writing-space/create" className={buttonVariants()}>
          Créer un cours
        </Link>
      </LayoutActions>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{course.name[0]}</AvatarFallback>
                        {course.image && (
                          <AvatarImage src={course.image} alt={course.name} />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/writing-space/my-courses/${course.id}`}
                      >
                        {course.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
