"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = ({ ...props }: ButtonProps) => {
  const logoutMutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });

  return (
    <Button
      variant={"outline"}
      {...props}
      onClick={() => {
        logoutMutation.mutate();
      }}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? (
        <Loader className="mr-2 size-4" />
      ) : (
        <LogOut className="mr-2 size-4" />
      )}
      Se déconnecter
    </Button>
  );
};
