"use client";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

/*
  logo.png is 279 × 29 px (≈ 10:1 aspect ratio — wide text logo).
  Width-based sizing with h-auto preserves the natural aspect ratio
  and responds to every breakpoint without distortion.
*/
const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  /* Navbar */
  sm: "w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]",
  /* Footer / Auth panel */
  md: "w-[150px] sm:w-[190px] md:w-[230px] lg:w-[260px]",
  /* Section headers */
  lg: "w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px]",
  /* Hero-level */
  xl: "w-[260px] sm:w-[340px] md:w-[400px] lg:w-[460px]",
};

export default function Logo({
  variant = "dark",
  size = "md",
  className,
}: Props) {
  return (
    <img
      src="/logo.png"
      alt="Casa del Rey Moro"
      draggable={false}
      className={cn(
        "h-auto max-w-full select-none object-contain",
        sizeClasses[size],
        variant === "light" && "brightness-0 invert",
        className
      )}
    />
  );
}
