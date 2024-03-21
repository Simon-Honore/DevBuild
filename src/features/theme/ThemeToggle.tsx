"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="mr-2 size-5 dark:hidden" />
      <Moon className="mr-2 hidden size-5 dark:block" />
      theme {theme}
      <span className="sr-only">Changer le theme</span>
    </Button>
  );
}
