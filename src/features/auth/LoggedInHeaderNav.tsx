import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        <Typography variant={"link"} as={Link} href={"/explore"}>
          Explorer les cours
        </Typography>
        <Typography variant={"link"} as={Link} href={"/courses-followed"}>
          Cours suivis
        </Typography>
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
            <SheetClose className="w-fit" asChild>
              <Typography variant={"link"} as={Link} href={"/explore"}>
                Explorer les cours
              </Typography>
            </SheetClose>

            <SheetClose className="w-fit" asChild>
              <Typography variant={"link"} as={Link} href={"/courses-followed"}>
                Cours suivis
              </Typography>
            </SheetClose>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant={"lead"} className="flex items-center text-xs">
              <SquarePen className="mr-2 size-4" />
              Espace rédaction
            </Typography>

            <div className="flex flex-col gap-4 border-b pb-4">
              <SheetClose className="w-fit" asChild>
                <Typography variant={"link"} as={Link} href={"/owner"}>
                  Mes cours
                </Typography>
              </SheetClose>

              <SheetClose className="w-fit" asChild>
                <Typography variant={"link"} as={Link} href={"owner/create"}>
                  Créer un cours
                </Typography>
              </SheetClose>
            </div>
            <div className="flex flex-col gap-4 border-b pb-4">
              <SheetClose className="w-fit" asChild>
                <Typography variant={"link"} as={Link} href={"/account"}>
                  Compte
                </Typography>
              </SheetClose>

              <ThemeToggle />
            </div>
          </div>

          <SheetClose className="w-fit" asChild>
            <LogoutButton />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};
