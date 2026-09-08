import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SpinnerIcon } from "./ui/icons";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  loading = false,
  loadingText,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium",
        "transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-brand text-primary-foreground ring-1 ring-brand/30 hover:bg-brand-soft focus-visible:ring-2 focus-visible:ring-brand/60 disabled:bg-brand/60 disabled:hover:bg-brand/60",
        variant === "secondary" &&
          "px-4 text-secondary-foreground ring-1 ring-border hover:bg-ink/[0.03] hover:text-ink focus-visible:ring-2 focus-visible:ring-muted-foreground disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {loading ? <SpinnerIcon className="size-4 shrink-0 animate-spin" /> : icon}
      {loading ? (loadingText ?? children) : children}
    </button>
  );
}
