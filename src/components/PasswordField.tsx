import { useState } from "react";

import { InputField, type InputFieldProps } from "./InputField";
import { EyeIcon, EyeOffIcon } from "./ui/icons";

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
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-2 my-auto grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          {visible ? (
            <EyeOffIcon className="size-4 shrink-0" />
          ) : (
            <EyeIcon className="size-4 shrink-0" />
          )}
        </button>
      }
    />
  );
}
