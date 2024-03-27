import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingCoursesOwnerPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">mes cours</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Skeleton className="h-8 w-[150px]" />
      </LayoutActions>
      <LayoutContent>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-6 md:items-stretch">
              <Skeleton className="my-auto size-16 rounded-md md:size-24" />
              <div className="flex grow flex-col gap-2 py-2">
                <Skeleton className="h-8 w-1/2" />

                <div className="space-y-2 max-md:hidden">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </LayoutContent>
    </Layout>
  );
}
