import { AuthHeader } from "@/features/auth/AuthHeader";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
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

        <AuthHeader />
      </div>
    </header>
  );
};
