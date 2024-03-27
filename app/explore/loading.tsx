import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CourseCardSkeleton } from "@/features/courses/CourseCardSkeleton";
import { PaginationNavSkeleton } from "@/features/pagination/PaginationNavSkeleton";

export default async function LoadingCoursesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">Explorer les cours</LayoutTitle>
      </LayoutHeader>

      <LayoutContent className="flex flex-col gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}

        <PaginationNavSkeleton />
      </LayoutContent>
    </Layout>
  );
}
