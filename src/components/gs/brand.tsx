import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/gamestream-logo.png.asset.json";
import mark from "@/assets/gamestream-mark.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ full = false, className }: { full?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={full ? logo.url : mark.url}
        alt="Game Stream"
        className={full ? "h-11 w-auto" : "h-9 w-9"}
      />
      {!full && (
        <span className="font-display text-sm font-bold text-brand-gradient">GAME STREAM</span>
      )}
    </Link>
  );
}

/** Cantos de enquadramento — elemento gráfico da marca. */
export function Framed({
  children,
  className,
  tone = "electric",
}: {
  children: ReactNode;
  className?: string;
  tone?: "electric" | "cyan" | "magenta";
}) {
  const color =
    tone === "cyan" ? "border-cyan" : tone === "magenta" ? "border-magenta" : "border-electric";
  const corner = cn("pointer-events-none absolute h-4 w-4 border-2", color);
  return (
    <div className={cn("relative", className)}>
      <span className={cn(corner, "left-0 top-0 rounded-tl-md border-b-0 border-r-0")} />
      <span className={cn(corner, "right-0 top-0 rounded-tr-md border-b-0 border-l-0")} />
      <span className={cn(corner, "bottom-0 left-0 rounded-bl-md border-r-0 border-t-0")} />
      <span className={cn(corner, "bottom-0 right-0 rounded-br-md border-l-0 border-t-0")} />
      {children}
    </div>
  );
}

export function StatusDot({ tone = "online" }: { tone?: "online" | "live" | "idle" }) {
  const color =
    tone === "live" ? "bg-live" : tone === "online" ? "bg-online" : "bg-muted-foreground";
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className={cn("absolute inline-flex h-full w-full rounded-full dot-live", color)} />
      <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}
