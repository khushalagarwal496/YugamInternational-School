import { AlertIcon } from "./ui/icons";

export function ValidationMessage({ id, message }: { id?: string | undefined; message?: string | null | undefined }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="rise mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-brand"
    >
      <AlertIcon className="mt-0.5 size-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}
