import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import defaultThumbnail from "../assets/default-thumbnail.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uploadUrl(path: string | undefined) {
  if (!path) {
    return defaultThumbnail;
  }

  return path.startsWith("http") ? path : `${import.meta.env.VITE_STRAPI_URL}${path}`;
}
