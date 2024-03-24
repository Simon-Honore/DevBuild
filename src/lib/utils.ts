import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstChar = (string: string) => {
  if (typeof string != "string") return;

  const firstCharCapitalize = string[0].toUpperCase();
  const stringWithoutFirstChar = string.slice(1);
  return firstCharCapitalize + stringWithoutFirstChar;
};

export const DateLongFormat = (date: Date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return date.toLocaleDateString("fr-FR", options);
};
