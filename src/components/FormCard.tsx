import type { ReactNode } from "react";

/** Warm ambient page background + centered frosted card shell. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-warmth relative min-h-screen w-full overflow-hidden text-ink">
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8%] top-1/3 h-80 w-80 rounded-full bg-glow/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] left-1/3 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
        {children}
      </div>
    </div>
  );
}

export function BrandMark({ tag }: { tag: string }) {
  return (
    <div className="mx-auto mb-7 flex max-w-full items-center gap-2.5">
      <span className="font-serif text-xl leading-none tracking-tight">YugamInternational School</span>
      <span className="ml-1 shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand">
        {tag}
      </span>
    </div>
  );
}

export function FormCard({
  title,
  description,
  banner,
  children,
}: {
  title: string;
  description: string;
  banner?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="frost-card rise mx-auto w-full max-w-md rounded-[20px] p-5 ring-1 ring-border sm:p-7">
      {banner}
      <h1 className="text-balance font-serif text-3xl leading-tight tracking-tight">{title}</h1>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}

export function PageFootnote({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-6 max-w-xs text-pretty text-center text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
