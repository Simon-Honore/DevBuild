"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export type PaginationNavProps = {
  totalPages: number;
  pageActive: number;
  baseURL: string;
};

export const PaginationNav = ({
  totalPages,
  pageActive,
  baseURL,
}: PaginationNavProps) => {
  const router = useRouter();

  console.log({ totalPages, pageActive });

  return (
    <div className="flex items-center gap-4">
      {/* Previous */}
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-primary"
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(pageActive - 1),
          });
          const url = `${baseURL}?${searchParams.toString()}`;
          router.push(url);
        }}
        disabled={pageActive < 2}
      >
        <ChevronLeft className="size-6" />
      </Button>

      {/* Page - 4 if is exist and page active is the last page */}
      {totalPages >= 5 && pageActive > 4 && pageActive === totalPages ? (
        <ButtonPageNumber
          step={4}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
          decrement
        />
      ) : null}

      {/* Page - 3 if is exist and page active is the second to last page */}
      {totalPages >= 4 &&
      pageActive > 3 &&
      pageActive <= totalPages &&
      pageActive > totalPages - 2 ? (
        <ButtonPageNumber
          step={3}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
          decrement
        />
      ) : null}

      {/* Page - 2 if is exist */}
      {totalPages >= 3 && pageActive > 2 ? (
        <ButtonPageNumber
          step={2}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
          decrement
        />
      ) : null}

      {/* Page - 1 if is exist */}
      {pageActive > 1 ? (
        <ButtonPageNumber
          step={1}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
          decrement
        />
      ) : null}

      {/* Page active */}
      <Button variant={"ghost"} size={"icon"} className="text-primary" disabled>
        {pageActive}
      </Button>

      {/* Page + 1 if is exist */}
      {pageActive < totalPages ? (
        <ButtonPageNumber
          step={1}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
        />
      ) : null}

      {/* Page + 2 if is exist */}
      {totalPages >= 3 && pageActive + 2 <= totalPages ? (
        <ButtonPageNumber
          step={2}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
        />
      ) : null}

      {/* Page + 3 if is exist and page active is the second page */}
      {totalPages >= 4 &&
      pageActive + 3 <= totalPages &&
      (pageActive === 1 || pageActive === 2) ? (
        <ButtonPageNumber
          step={3}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
        />
      ) : null}

      {/* Page + 4 if is exist and page active is the first page */}
      {totalPages >= 5 && pageActive + 4 <= totalPages && pageActive == 1 ? (
        <ButtonPageNumber
          step={4}
          router={router}
          pageActive={pageActive}
          baseURL={baseURL}
        />
      ) : null}

      {/* Next */}
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-primary"
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: String(pageActive + 1),
          });
          const url = `${baseURL}?${searchParams.toString()}`;
          router.push(url);
        }}
        disabled={pageActive == totalPages}
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
};

type ButtonPageNumberProps = {
  step: number;
  pageActive: number;
  router: AppRouterInstance;
  baseURL: string;
  decrement?: boolean;
};

const ButtonPageNumber = ({
  step,
  pageActive,
  router,
  baseURL,
  decrement = false,
}: ButtonPageNumberProps) => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="text-primary"
      onClick={() => {
        const searchParams = new URLSearchParams({
          page: decrement
            ? String(pageActive - step)
            : String(pageActive + step),
        });
        const url = `${baseURL}?${searchParams.toString()}`;
        router.push(url);
      }}
    >
      {decrement ? pageActive - step : pageActive + step}
    </Button>
  );
};
