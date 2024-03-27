/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingCourseLessonsPage() {
  return (
    <Layout>
      <LayoutHeader>
        <Skeleton className="h-8 w-2/3 md:w-[300px]" />
      </LayoutHeader>
      <LayoutActions>
        <Skeleton className="h-8 w-[80px]" />
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
        <Card className="max-w-full flex-[3] overflow-auto">
          <CardHeader>
            <CardTitle>Contenu</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
