import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Header() {
  return (
    <header className="sticky h-16 w-full shadow shadow-primary">
      <div className="container flex h-full items-center justify-between">
        <Link href={"/"} className="mr-8">
          <Image
            src="/images/logos/devbuild-logo-text.png"
            width={150}
            height={50}
            alt="DevBuild Logo"
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* On desktop */}
        <nav className="flex flex-1 items-center justify-between max-md:hidden">
          <Typography variant={"link"} as={Link} href={"#"}>
            Explorer les cours
          </Typography>
          <Button variant={"outline"}>Se connecter</Button>
        </nav>

        {/* On mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <Menu className="size-8 stroke-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[90%] flex-col gap-6 bg-background pt-10">
              <Typography variant={"link"} as={Link} href={"#"}>
                Explorer les cours
              </Typography>
              <Button variant={"outline"}>Se connecter</Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
