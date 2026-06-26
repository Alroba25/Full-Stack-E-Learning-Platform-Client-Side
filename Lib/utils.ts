import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// calc time ago
export const getTimeAgo = (date: string | Date) => {
  if (!date) return "";
  
  const now = new Date();
  const updated = new Date(date);

  const diff = now.getTime() - updated.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (hours <= 24) {
    if (hours === 0) return "Now";
    return `${hours} hours ago`;
  }
  if (days <= 30) {
    return `${days} days ago`;
  }
  if (weeks <= 4) {
    return `${weeks} weeks ago`;
  }
  if (months <= 12) {
    return `${months} months ago`;
  }
  return `${years} years ago`;
};
