import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReadTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min read`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m read`;
}

export function formatLearnerCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }
  return `${(count / 1000).toFixed(1)}k`;
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 80) return "bg-green-600";
  if (percentage >= 60) return "bg-blue-600";
  if (percentage >= 40) return "bg-yellow-600";
  return "bg-gray-600";
}

export function getLevelColor(level: string): string {
  switch (level.toLowerCase()) {
    case "beginner":
      return "text-green-700 bg-green-50 border-green-200";
    case "intermediate":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "advanced":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
