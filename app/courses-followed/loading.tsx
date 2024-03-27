import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { CourseCardSkeleton } from "@/features/courses/CourseCardSkeleton";
import { PaginationNavSkeleton } from "@/features/pagination/PaginationNavSkeleton";

export default async function LoadingCoursesFollowedPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">cours suivis</LayoutTitle>
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
