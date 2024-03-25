import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, SquarePen } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LogoutButton } from "./LogoutButton";

type AuthHeaderProps = {
  user: Session["user"];
};

export const LoggedInHeaderNav = ({ user }: AuthHeaderProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-6 max-md:hidden">
        <CoursesNav />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <Menu className="size-8 stroke-primary" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex w-[90%] flex-col bg-background pt-10">
          <div className="flex items-center gap-2 border-b pb-8">
            <Avatar className="size-16">
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              {user.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name ?? "user picture"}
                />
              ) : null}
            </Avatar>
            <div className="flex h-full flex-col items-start justify-center gap-1">
              <Typography variant={"h3"}>
                {user.name ?? "Nom d'utilisateur"}
              </Typography>
              <Typography variant={"small"}>{user.email}</Typography>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b pb-4 md:hidden">
            <CoursesNav />
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant={"lead"} className="flex items-center text-xs">
              <SquarePen className="mr-2 size-4" />
              Espace rédaction
            </Typography>
            <div className="flex flex-col gap-4 border-b pb-4">
              <Typography variant={"link"} as={Link} href={"#"}>
                Mes cours
              </Typography>
              <Typography variant={"link"} as={Link} href={"#"}>
                Créer un cours
              </Typography>
            </div>
          </div>

          <ThemeToggle />

          <LogoutButton />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const CoursesNav = () => {
  return (
    <>
      <Typography variant={"link"} as={Link} href={"/courses"}>
        Explorer les cours
      </Typography>
      <Typography variant={"link"} as={Link} href={"/joined-courses"}>
        Cours suivis
      </Typography>
    </>
  );
};
