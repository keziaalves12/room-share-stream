import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Volume2,
  VolumeX,
  Maximize2,
  LogOut,
  Activity,
  MessageSquare,
  Users,
  Play,
} from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, MetricRow, Panel } from "@/components/gs/controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/viewer")({
  head: () => ({
    meta: [
      { title: "Assistindo GS-7K2P — Game Stream" },
      {
        name: "description",
        content:
          "Assista à tela compartilhada do seu amigo em baixa latência, com áudio, tela cheia e métricas de conexão.",
      },
      { property: "og:title", content: "Assistindo a sala GS-7K2P — Game Stream" },
      {
        property: "og:description",
        content: "Tela grande, áudio e conexão em tempo real com a sua galera.",
      },
    ],
  }),
  component: ViewerScreen,
});

const people = ["Lucas (host)", "Bia", "Rafa", "Você"];

function ViewerScreen() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [stats, setStats] = useState(true);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <span className="hidden truncate rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:inline">
            GS-7K2P
          </span>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-magenta/60 bg-magenta/10 px-3 py-1.5 text-xs text-magenta">
          <StatusDot tone="live" /> Ao vivo
        </span>
      </header>

      <main className="mt-5 grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <div className="surface overflow-hidden p-2 sm:p-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-[oklch(0.1_0.03_265)]">
              <Framed className="absolute inset-6" tone="cyan">
                <div className="grid h-full place-items-center">
                  <div className="text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-primary-foreground">
                      <Play size={22} />
                    </span>
                    <p className="mt-3 text-sm text-foreground">Tela de Lucas</p>
                    <p className="text-xs text-muted-foreground">1080p · 60fps · 24 ms</p>
                  </div>
                </div>
              </Framed>
              <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-background/70 px-2.5 py-1 text-[11px] text-foreground backdrop-blur">
                <StatusDot tone="online" /> Conectado
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-secondary/30 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setMuted((v) => !v)}
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition-colors",
                    muted
                      ? "border-border text-muted-foreground"
                      : "border-cyan/60 text-cyan shadow-[0_0_22px_-10px_var(--cyan)]",
                  )}
                  aria-label={muted ? "Ativar áudio" : "Silenciar"}
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setMuted(false);
                  }}
                  className="h-1 w-full min-w-0 max-w-48 accent-[var(--electric)]"
                  aria-label="Volume"
                />
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <GsButton
                  icon={Activity}
                  onClick={() => setStats((v) => !v)}
                  className="h-10 px-3"
                >
                  <span className="hidden sm:inline">Métricas</span>
                </GsButton>
                <GsButton icon={Maximize2} className="h-10 px-3">
                  <span className="hidden sm:inline">Tela cheia</span>
                </GsButton>
                <Link to="/">
                  <GsButton variant="critical" icon={LogOut} className="h-10 px-3">
                    <span className="hidden sm:inline">Sair</span>
                  </GsButton>
                </Link>
              </div>
            </div>
          </div>

          {stats && (
            <Panel title="Métricas da conexão">
              <div className="grid gap-x-6 sm:grid-cols-2">
                <MetricRow label="Estado" value="connected" tone="text-online" />
                <MetricRow label="Latência" value="24 ms" tone="text-cyan" />
                <MetricRow label="Bitrate recebido" value="7.4 Mbps" />
                <MetricRow label="FPS" value="60" />
                <MetricRow label="Jitter" value="3 ms" />
                <MetricRow label="Frames perdidos" value="12" />
                <MetricRow label="Resolução" value="1920x1080" />
                <MetricRow label="Codec" value="H264 / opus" />
              </div>
              <pre className="mt-3 max-h-32 overflow-auto rounded-lg border border-border/70 bg-[oklch(0.12_0.03_265)] p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {[
                  "[00:02] joined room GS-7K2P",
                  "[00:03] connectionstate → connected",
                  "[00:03] receiving video 1920x1080@60",
                  "[01:14] rtt 24 ms · jitter 3 ms",
                ].join("\n")}
              </pre>
            </Panel>
          )}
        </div>

        <aside className="min-w-0 space-y-4">
          <Panel
            title="Na sala"
            action={
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users size={14} /> {people.length}
              </span>
            }
          >
            <ul className="space-y-2">
              {people.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-gradient text-xs font-semibold text-primary-foreground">
                    {p[0]}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{p}</span>
                  <StatusDot />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Chat da sala">
            <ul className="space-y-3 text-sm">
              {[
                { who: "Lucas", msg: "entra aí, tô começando" },
                { who: "Bia", msg: "que fase é essa? kkkk" },
                { who: "Rafa", msg: "tá liso demais o vídeo" },
              ].map((m) => (
                <li key={m.who}>
                  <span className="text-xs font-medium text-electric">{m.who}</span>
                  <p className="text-foreground">{m.msg}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <input
                placeholder="Manda algo..."
                className="h-10 min-w-0 rounded-lg border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-electric"
              />
              <GsButton icon={MessageSquare} className="h-10 w-10 px-0" aria-label="Enviar" />
            </div>
          </Panel>
        </aside>
      </main>
    </div>
  );
}
