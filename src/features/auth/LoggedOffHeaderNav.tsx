import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { LoginButton } from "./LoginButton";

export const LoggedOffHeaderNav = () => {
  return (
    <div>
      {/* On desktop */}
      <div className="flex items-center gap-6 max-md:hidden">
        <Typography variant={"link"} as={Link} href={"/courses"}>
          Explorer les cours
        </Typography>
        <LoginButton />
      </div>

      {/* On mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size={"icon"}>
              <Menu className="size-8 stroke-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[90%] flex-col gap-6 bg-background pt-10">
            <Typography variant={"link"} as={Link} href={"/courses"}>
              Explorer les cours
            </Typography>
            <LoginButton />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
