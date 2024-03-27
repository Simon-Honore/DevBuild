import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="text- m-auto flex max-w-7xl items-center gap-10 p-6 py-16 md:p-16">
        <div className="space-y-6">
          <h1 className=" scroll-m-20  text-4xl font-extrabold tracking-tight md:text-6xl">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-br from-primary to-sky-700 bg-clip-text text-7xl text-transparent">
              DevBuild
            </span>
          </h1>
          <Typography variant={"large"}>
            DevBuild est une plateforme de cours en ligne pour les développeurs.
            Vous pouvez apprendre à coder en suivant des cours, des tutoriels et
            des exercices. Et tout cela fait par la communauté et pour la
            communauté. Vous pouvez vous-même participer et créer facilement vos
            cours.
          </Typography>
          <Typography variant={"muted"}>
            * Ce site à été réalisé dans un but d&apos;apprentissage. Mais
            n&apos;hésitez pas à le remplir!
          </Typography>
        </div>
        <Image
          src={"/images/logos/devbuild-logo.svg"}
          width={250}
          height={250}
          alt="logo du site"
          className=" opacity-90 drop-shadow-lg max-md:hidden"
        />
      </div>

      <div className="w-full bg-secondary">
        <div className="m-auto flex max-w-6xl items-center gap-12 p-6 py-16 md:p-16">
          <div className="space-y-6">
            <h2 className=" scroll-m-20 bg-gradient-to-br from-primary to-sky-700 bg-clip-text text-3xl  font-extrabold tracking-tight text-transparent md:text-5xl">
              Qui suis-je ?
            </h2>

            <Avatar className="m-auto size-40 md:hidden">
              <AvatarImage
                src="https://media.licdn.com/dms/image/D4E03AQHV9My-67K5mQ/profile-displayphoto-shrink_800_800/0/1707739349450?e=1717027200&v=beta&t=rBN5Oum3m9JZX4OL49y6pxk5BElOPPE4f-CaR1NUY0A"
                alt="photo de Simon honoré"
              />
            </Avatar>

            <div className="space-y-2">
              <Typography variant={"large"}>
                Je m&apos;appelle{" "}
                <span className=" bg-gradient-to-r from-primary to-sky-700 bg-clip-text text-xl font-bold text-transparent">
                  Simon HONORÉ
                </span>
                , après des années de commerce j&apos;ai réalisé une
                reconversion réussie dans le développement web. J&apos;ai créer
                ce site dans un but d&apos;apprentissage, et de montrer mes
                acquis en React et NextJs.
              </Typography>
              <Typography variant={"large"}>
                Après un titre professionnel de développeur web et mobile, ainsi
                qu&apos;un stage, je suis à la recherche de ma première
                expérience professionnelle. Que ce soit en contrat, ou en
                alternance avec l&apos;école MyDigitaleSchool pour la rentrée de
                septembre 2024. Alternance d&apos;un an, une semaine école, deux
                semaines entreprise.
              </Typography>
            </div>
            <div className="flex justify-center gap-6 md:justify-start">
              <Typography
                as={Link}
                className={buttonVariants()}
                href="https://www.linkedin.com/in/simon-honore/"
                target="_blank"
              >
                <Linkedin className="mr-2 size-4" />
                LinkedIn
              </Typography>
              <Typography
                as={Link}
                className={buttonVariants()}
                href="https://github.com/Simon-Honore"
                target="_blank"
              >
                <Github className="mr-2 size-4" />
                GitHub
              </Typography>
            </div>
          </div>

          <Avatar className="size-48 max-md:hidden ">
            <AvatarImage
              src="https://media.licdn.com/dms/image/D4E03AQHV9My-67K5mQ/profile-displayphoto-shrink_800_800/0/1707739349450?e=1717027200&v=beta&t=rBN5Oum3m9JZX4OL49y6pxk5BElOPPE4f-CaR1NUY0A"
              alt="photo de Simon honoré"
            />
          </Avatar>
        </div>
      </div>
    </div>
  );
}
