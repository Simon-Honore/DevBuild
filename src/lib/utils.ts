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
