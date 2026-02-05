import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uploadUrl(path: string) {
  return path.startsWith("http") ? path : `${import.meta.env.VITE_STRAPI_URL}${path}`;
}
