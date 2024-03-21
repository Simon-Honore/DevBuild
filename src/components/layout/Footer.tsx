import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/Typography";

// TODO: faire les pages privacy et cgv
// TODO: faire section QUI SUIS-JE avec liens réseaux et page de présentation
// TODO: faire section CONTACT avec formulaire de contact dans la page de présentation
// TODO: faire section liste des pages

export const Footer = () => {
  return (
    <footer className="container flex flex-col gap-6 border-t p-6 text-muted-foreground">
      <div className="flex items-center justify-center ">
        <Link href={"/"} className="mr-8">
          <Image
            src="/images/logos/devbuild-logo-text.png"
            width={150}
            height={50}
            alt="DevBuild Logo"
            priority
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex gap-4">
          <Typography
            as={Link}
            variant={"link"}
            className="text-xs text-muted-foreground hover:text-primary"
            href="/legal/privacy"
          >
            Privacy
          </Typography>
          <Typography
            as={Link}
            variant={"link"}
            className="text-xs text-muted-foreground hover:text-primary"
            href="/legal/cgv"
          >
            CGV
          </Typography>
        </div>
      </div>
      <div className="text-center">
        <Typography variant="extraSmall">
          © {new Date().getFullYear()} DevBuild - Simon Honoré. Tous droits
          réservés.
        </Typography>
      </div>
    </footer>
  );
};
