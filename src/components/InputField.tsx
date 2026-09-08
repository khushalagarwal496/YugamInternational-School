import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ValidationMessage } from "./ValidationMessage";
import { AlertOutlineIcon, CheckIcon } from "./ui/icons";

export type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string | null | undefined;
  /** Shows the success tick when the field has been checked and passed. */
  valid?: boolean | undefined;
  hint?: string | undefined;
  /** Extra control rendered inside the field, e.g. a password toggle. */
  trailing?: ReactNode;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { id, label, error, valid, hint, trailing, className, ...props },
  ref,
) {
  const messageId = `${id}-message`;
  const showTick = Boolean(valid) && !error;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-secondary-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            "w-full rounded-[10px] bg-card/70 px-3.5 py-2.5 text-sm text-ink outline-none",
            "placeholder:text-muted-foreground/70 ring-1 ring-border transition-shadow duration-200",
            "focus:ring-2 focus:ring-brand/50",
            "disabled:cursor-not-allowed disabled:bg-muted/60 disabled:text-muted-foreground",
            error && "ring-brand/60 focus:ring-brand/60",
            trailing ? "pr-11" : "pr-9",
            className,
          )}
          {...props}
        />
        {trailing ? (
          trailing
        ) : error ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-brand">
            <AlertOutlineIcon className="size-4 shrink-0" />
          </span>
        ) : showTick ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-success">
            <CheckIcon className="size-4 shrink-0" />
          </span>
        ) : null}
      </div>
      {error ? (
        <ValidationMessage id={messageId} message={error} />
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
