import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GsButton({
  variant = "secondary",
  className,
  children,
  icon: Icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "critical" | "ghost";
  icon?: LucideIcon;
}) {
  const styles = {
    primary:
      "bg-brand-gradient text-primary-foreground font-semibold glow-ring hover:brightness-110",
    secondary: "border border-border bg-secondary/60 text-foreground hover:border-electric/70",
    critical:
      "border border-destructive/50 bg-destructive/15 text-destructive hover:bg-destructive/25",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
  }[variant];

  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm transition-all active:scale-[0.98] disabled:opacity-50",
        styles,
        className,
      )}
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      {children}
    </button>
  );
}

export function ToggleTile({
  icon: Icon,
  label,
  hint,
  active,
  tone = "cyan",
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  hint?: string;
  active: boolean;
  tone?: "cyan" | "electric" | "magenta" | "online";
  onClick: () => void;
}) {
  const toneRing = {
    cyan: "border-cyan/70 text-cyan shadow-[0_0_24px_-8px_var(--cyan)]",
    electric: "border-electric/70 text-electric shadow-[0_0_24px_-8px_var(--electric)]",
    magenta: "border-magenta/70 text-magenta shadow-[0_0_24px_-8px_var(--magenta)]",
    online: "border-online/70 text-online shadow-[0_0_24px_-8px_var(--online)]",
  }[tone];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-xl border bg-secondary/40 px-3 py-3 text-left transition-all active:scale-[0.98]",
        active ? toneRing : "border-border text-muted-foreground hover:border-electric/40",
      )}
    >
      <Icon size={20} strokeWidth={2} className="shrink-0" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">{label}</span>
        {hint && <span className="block truncate text-xs text-muted-foreground">{hint}</span>}
      </span>
    </button>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface p-4 sm:p-5", className)}>
      {(title || action) && (
        <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {title}
          </h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function MetricRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2 text-sm last:border-0">
      <span className="min-w-0 truncate text-muted-foreground">{label}</span>
      <span className={cn("font-mono text-xs tabular-nums", tone ?? "text-foreground")}>
        {value}
      </span>
    </div>
  );
}
