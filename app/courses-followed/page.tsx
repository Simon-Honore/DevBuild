import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CourseCard } from "@/features/courses/CourseCard";
import { getAllCoursesFollowed } from "@/features/courses/followed/courses.query";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function CoursesFollowedPage() {
  const session = await getRequiredAuthSession();

  const courses = await getAllCoursesFollowed(session.user.id);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">Cours suivis</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        {courses.map((course) => (
          <Link href={`/courses-followed/${course.id}`} key={course.id}>
            <CourseCard course={course} />
          </Link>
        ))}
      </LayoutContent>
    </Layout>
  );
}
