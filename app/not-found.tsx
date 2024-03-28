import { Typography } from "@/components/ui/Typography";

export default function NotFound() {
  return (
    <div className="m-auto flex w-fit items-center gap-6 py-16 max-md:flex-col">
      <h1 className="bg-gradient-to-r from-primary to-sky-700 bg-clip-text text-[8rem] font-extrabold text-transparent">
        404
      </h1>
      <Typography variant={"lead"}>
        La page que vous cherchez n&apos;existe pas.
      </Typography>
    </div>
  );
}
