import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CourseCard } from "@/features/courses/CourseCard";
import { getAllCourses } from "@/features/courses/explore/courses.query";
import { PaginationNav } from "@/features/pagination/PaginationNav";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();

  const page = Number(searchParams.page ?? 1);
  const itemsPerPage = 10;

  const courses = await getAllCourses({
    userPage: page,
    itemsPerPage,
    userId: session?.user.id,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">Explorer les cours</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        {courses.data.map((course) => (
          <Link href={`/explore/${course.id}`} key={course.id}>
            <CourseCard course={course} />
          </Link>
        ))}

        <PaginationNav
          totalPages={Math.ceil(courses.count / itemsPerPage)}
          pageActive={page}
          baseURL="/courses"
          className="self-center"
        />
      </LayoutContent>
    </Layout>
  );
}
