"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const PaginationNavSkeleton = () => {
  return (
    <div className={cn("flex items-center gap-3 md:gap-4 md:self-center")}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="size-4" />
      ))}
    </div>
  );
};
