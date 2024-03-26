import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CreatorCardProps = {
  creator: {
    name: string | null;
    image: string | null;
  };
};

export const CreatorCard = ({ creator }: CreatorCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créé par</CardTitle>
      </CardHeader>
      <CardContent className="flex min-w-[200px] flex-col items-center gap-2">
        <Avatar className="size-24 md:size-28">
          <AvatarFallback>{creator.name?.[0] ?? "A"}</AvatarFallback>
          {creator.image ? (
            <AvatarImage src={creator.image} alt="image de l'auteur" />
          ) : null}
        </Avatar>
        <Typography variant={"large"} className="text-muted-foreground">
          {creator.name ?? "Auteur anonyme"}
        </Typography>
      </CardContent>
    </Card>
  );
};
