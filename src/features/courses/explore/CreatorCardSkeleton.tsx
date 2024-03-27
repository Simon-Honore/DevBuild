import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CreatorCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créé par</CardTitle>
      </CardHeader>
      <CardContent className="flex min-w-[200px] flex-col items-center gap-2">
        <Skeleton className="size-24 md:size-28" />
        <Skeleton />
      </CardContent>
    </Card>
  );
};
