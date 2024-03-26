"use client";

import { Typography } from "@/components/ui/Typography";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Typography
      variant="link"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex cursor-pointer items-center gap-2"
    >
      Theme {theme}
      <Sun className="mr-2 size-5 dark:hidden" />
      <Moon className="mr-2 hidden size-5 dark:block" />
      <span className="sr-only">Changer le theme</span>
    </Typography>
  );
}
