import { CheckIcon } from "./ui/icons";

export function SuccessMessage({ title, description }: { title: string; description?: string }) {
  return (
    <div
      role="status"
      className="rise mb-5 flex items-center gap-3 rounded-[12px] bg-success-surface/80 px-3.5 py-3 ring-1 ring-success/20"
    >
      <div className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-primary-foreground">
        <CheckIcon className="size-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-success-foreground">{title}</p>
        {description ? (
          <p className="text-xs leading-relaxed text-success-foreground/80">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
