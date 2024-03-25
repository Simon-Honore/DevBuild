import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CourseCard } from "@/features/courses/CourseCard";
import { getCoursesJoined } from "@/features/courses/joined-courses.query";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function JoinedCoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await getCoursesJoined(session.user.id);

  console.log({ courses });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">Cours suivis</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        {courses.map((course) => (
          <Link href={`/joined-courses/${course.id}`} key={course.id}>
            <CourseCard course={course} />
          </Link>
        ))}
      </LayoutContent>
    </Layout>
  );
}
