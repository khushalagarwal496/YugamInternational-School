import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputField, type InputFieldProps } from "./InputField";

export function PasswordField(props: Omit<InputFieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={props.autoComplete ?? "new-password"}
      trailing={
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => {
            // Prevent input blur when clicking toggle
            e.preventDefault();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setVisible((prev) => !prev);
          }}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-2 z-10 my-auto flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          {visible ? (
            <EyeOff className="size-4 shrink-0 pointer-events-none" />
          ) : (
            <Eye className="size-4 shrink-0 pointer-events-none" />
          )}
        </button>
      }
    />
  );
}
