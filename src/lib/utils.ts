import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export function getCountryName(code: string) {
  return regionNames.of(code);
}
