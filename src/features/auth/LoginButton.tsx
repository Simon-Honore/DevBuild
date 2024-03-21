"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginButton = ({ ...props }: ButtonProps) => {
  const loginMutation = useMutation({
    mutationFn: async () => signIn(),
  });

  return (
    <Button
      variant={"outline"}
      {...props}
      onClick={() => {
        loginMutation.mutate();
      }}
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? (
        <Loader className="mr-2 size-4" />
      ) : (
        <LogIn className="mr-2 size-4" />
      )}
      Se connecter
    </Button>
  );
};
