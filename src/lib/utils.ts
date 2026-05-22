import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function generateCode() {
  return Array.from({ length: 8 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
  ).join("");
}

export function fauxHash(pw: string) {
  let h = 0;
  for (let i = 0; i < pw.length; i++) h = (h << 5) - h + pw.charCodeAt(i);
  return "h$" + Math.abs(h).toString(36);
}
