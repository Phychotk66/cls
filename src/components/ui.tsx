"use client";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

/* ─── Button ─────────────────────────────────────────────────── */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          {
            // size
            "text-[10px] px-4 py-2": size === "sm",
            "text-[11px] px-6 py-3": size === "md",
            "text-[11px] px-8 py-3.5": size === "lg",
            // variant
            "bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a] focus-visible:ring-[#1d3a8a] shadow-sm":
              variant === "primary",
            "border border-[#0f0e0c] text-[#0f0e0c] hover:bg-[#0f0e0c] hover:text-[#faf6ee] focus-visible:ring-[#0f0e0c]":
              variant === "outline",
            "text-[#7c7060] hover:text-[#0f0e0c] hover:bg-[#e2d5c0]/30":
              variant === "ghost",
            // disabled
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

/* ─── Field ──────────────────────────────────────────────────── */
interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  right?: React.ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, hint, right, className, ...props }, ref) => (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "w-full rounded-md border bg-white/80 px-3.5 py-2.5 text-sm text-[#0f0e0c] placeholder-[#7c7060]/60 outline-none transition",
            "focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25",
            error
              ? "border-[#8e1d2c] ring-1 ring-[#8e1d2c]/30"
              : "border-[#e2d5c0]",
            right && "pr-12",
            className
          )}
          {...props}
        />
        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>
        )}
      </div>
      {error && (
        <p className="text-xs text-[#8e1d2c]">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#7c7060]">{hint}</p>
      )}
    </div>
  )
);
Field.displayName = "Field";

/* ─── Textarea ───────────────────────────────────────────────── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md border bg-white/80 px-3.5 py-2.5 text-sm text-[#0f0e0c] placeholder-[#7c7060]/60 outline-none transition resize-none",
          "focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25",
          error ? "border-[#8e1d2c] ring-1 ring-[#8e1d2c]/30" : "border-[#e2d5c0]",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[#8e1d2c]">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";

/* ─── Badge ──────────────────────────────────────────────────── */
export function Badge({
  children,
  color = "ink",
}: {
  children: React.ReactNode;
  color?: "ink" | "gold" | "green" | "red" | "blue";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
        {
          "bg-[#0f0e0c] text-[#faf6ee]": color === "ink",
          "bg-[#c9a84c]/20 text-[#a07c28]": color === "gold",
          "bg-[#1f6f4a]/15 text-[#1f6f4a]": color === "green",
          "bg-[#8e1d2c]/15 text-[#8e1d2c]": color === "red",
          "bg-[#1d3a8a]/15 text-[#1d3a8a]": color === "blue",
        }
      )}
    >
      {children}
    </span>
  );
}

/* ─── Diamond accent ─────────────────────────────────────────── */
export function Diamond({
  color = "blue",
  size = "sm",
}: {
  color?: "blue" | "red" | "green" | "gold";
  size?: "xs" | "sm" | "md";
}) {
  const colors = {
    blue: "bg-[#1d3a8a]",
    red: "bg-[#8e1d2c]",
    green: "bg-[#1f6f4a]",
    gold: "bg-[#c9a84c]",
  };
  const sizes = { xs: "h-2 w-2", sm: "h-3 w-3", md: "h-4 w-4" };
  return (
    <span className={cn("rotate-45 inline-block shadow-sm", colors[color], sizes[size])} />
  );
}

/* ─── Section eyebrow ────────────────────────────────────────── */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#a07c28]">
      <span className="h-px w-8 bg-[#c9a84c]" />
      {children}
    </div>
  );
}
