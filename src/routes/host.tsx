import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MonitorUp,
  Mic,
  Volume2,
  Copy,
  Link2,
  Users,
  Settings2,
  Terminal,
  Square,
  Check,
} from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, MetricRow, Panel, ToggleTile } from "@/components/gs/controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/host")({
  head: () => ({
    meta: [
      { title: "Sala GS-7K2P · Host — Game Stream" },
      {
        name: "description",
        content:
          "Painel do host: compartilhe a tela, ajuste qualidade, áudio e microfone e acompanhe o estado da transmissão.",
      },
      { property: "og:title", content: "Painel do host — Game Stream" },
      {
        property: "og:description",
        content: "Controle sua transmissão de tela e chame seus amigos para a sala.",
      },
    ],
  }),
  component: HostScreen,
});

const qualities = [
  { id: "1080p60", label: "1080p · 60fps", hint: "~8 Mbps" },
  { id: "1080p30", label: "1080p · 30fps", hint: "~5 Mbps" },
  { id: "720p60", label: "720p · 60fps", hint: "~4 Mbps" },
  { id: "auto", label: "Automático", hint: "adapta à rede" },
];

const friends = [
  { name: "Lucas", state: "assistindo" },
  { name: "Bia", state: "assistindo" },
  { name: "Rafa", state: "conectando" },
];

const debugLines = [
  "[00:12] icegatheringstate → complete",
  "[00:12] connectionstate → connected",
  "[00:13] track added: video (screen)",
  "[00:13] track added: audio (system)",
  "[00:41] bitrate 7.9 Mbps · rtt 21 ms",
];

function HostScreen() {
  const [sharing, setSharing] = useState(true);
  const [mic, setMic] = useState(true);
  const [sysAudio, setSysAudio] = useState(true);
  const [quality, setQuality] = useState("1080p60");
  const [copied, setCopied] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(true);

  const copy = (what: string, value: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(what);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Logo />
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
              sharing
                ? "border-magenta/60 bg-magenta/10 text-magenta"
                : "border-border bg-secondary/50 text-muted-foreground",
            )}
          >
            <StatusDot tone={sharing ? "live" : "idle"} />
            {sharing ? "Transmitindo" : "Parado"}
          </span>
          <Link to="/">
            <GsButton variant="critical" icon={Square} className="h-9 px-3">
              <span className="hidden sm:inline">Encerrar</span>
            </GsButton>
          </Link>
        </div>
      </header>

      <main className="mt-5 grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <Panel className="p-3 sm:p-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-[oklch(0.12_0.03_265)]">
              <div className="absolute inset-0 grid place-items-center">
                {sharing ? (
                  <div className="text-center">
                    <MonitorUp size={40} className="mx-auto text-electric" />
                    <p className="mt-3 text-sm text-foreground">Tela inteira · Monitor 1</p>
                    <p className="text-xs text-muted-foreground">
                      seus amigos estão vendo isto agora
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Nada sendo compartilhado</p>
                  </div>
                )}
              </div>
              <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-background/70 px-2.5 py-1 text-[11px] text-foreground backdrop-blur">
                <StatusDot tone={sharing ? "live" : "idle"} />
                {sharing ? "AO VIVO" : "OFFLINE"}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[11px] text-cyan backdrop-blur">
                {quality}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
              <GsButton
                variant={sharing ? "critical" : "primary"}
                icon={MonitorUp}
                onClick={() => setSharing((v) => !v)}
              >
                {sharing ? "Parar de compartilhar" : "Compartilhar tela"}
              </GsButton>
              <GsButton
                icon={Mic}
                onClick={() => setMic((v) => !v)}
                className={mic ? "border-online/60 text-online" : ""}
              >
                {mic ? "Microfone ligado" : "Microfone mudo"}
              </GsButton>
              <GsButton
                icon={Volume2}
                onClick={() => setSysAudio((v) => !v)}
                className={sysAudio ? "border-cyan/60 text-cyan" : ""}
              >
                Áudio da tela
              </GsButton>
              <GsButton icon={Settings2} className="sm:w-11 sm:px-0" aria-label="Configurações" />
            </div>
          </Panel>

          <Panel title="Qualidade da transmissão">
            <div className="grid gap-2 sm:grid-cols-2">
              {qualities.map((q) => (
                <ToggleTile
                  key={q.id}
                  icon={MonitorUp}
                  label={q.label}
                  hint={q.hint}
                  active={quality === q.id}
                  tone="electric"
                  onClick={() => setQuality(q.id)}
                />
              ))}
            </div>
          </Panel>
        </div>

        <aside className="min-w-0 space-y-4">
          <Panel title="Sua sala">
            <Framed className="rounded-xl bg-secondary/30 px-4 py-5 text-center" tone="magenta">
              <p className="font-display text-2xl font-bold text-brand-gradient">GS-7K2P</p>
            </Framed>
            <div className="mt-3 grid gap-2">
              <GsButton
                icon={copied === "code" ? Check : Copy}
                onClick={() => copy("code", "GS-7K2P")}
              >
                {copied === "code" ? "Código copiado" : "Copiar código"}
              </GsButton>
              <GsButton
                icon={copied === "link" ? Check : Link2}
                onClick={() => copy("link", "https://gamestream.app/r/GS-7K2P")}
              >
                {copied === "link" ? "Link copiado" : "Copiar link da sala"}
              </GsButton>
            </div>
            <p className="mt-3 truncate rounded-lg border border-border/70 bg-secondary/30 px-3 py-2 font-mono text-xs text-muted-foreground">
              gamestream.app/r/GS-7K2P
            </p>
          </Panel>

          <Panel
            title="Na sala"
            action={
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users size={14} /> {friends.length}
              </span>
            }
          >
            <ul className="space-y-2">
              {friends.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-gradient text-xs font-semibold text-primary-foreground">
                    {f.name[0]}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{f.name}</span>
                  <StatusDot tone={f.state === "assistindo" ? "online" : "idle"} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            title="Debug WebRTC"
            action={
              <button
                onClick={() => setShowDebug((v) => !v)}
                className="text-xs text-electric hover:underline"
              >
                {showDebug ? "ocultar" : "mostrar"}
              </button>
            }
          >
            <MetricRow label="Estado" value="connected" tone="text-online" />
            <MetricRow label="Bitrate" value="7.9 Mbps" />
            <MetricRow label="FPS enviado" value="60" />
            <MetricRow label="RTT" value="21 ms" tone="text-cyan" />
            <MetricRow label="Pacotes perdidos" value="0.2%" />
            <MetricRow label="Codec" value="H264 / opus" />
            {showDebug && (
              <pre className="mt-3 max-h-40 overflow-auto rounded-lg border border-border/70 bg-[oklch(0.12_0.03_265)] p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {debugLines.join("\n")}
              </pre>
            )}
            <GsButton icon={Terminal} className="mt-3 w-full">
              Copiar relatório
            </GsButton>
          </Panel>
        </aside>
      </main>
    </div>
  );
}
