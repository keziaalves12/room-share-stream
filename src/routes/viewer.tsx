import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  LogOut,
  Activity,
  MessageSquare,
  Users,
  Play,
  Smile,
} from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, MetricRow, Panel } from "@/components/gs/controls";
import { readRoomCode } from "@/lib/room";
import { cn } from "@/lib/utils";

const EMOJIS = [
  "😀","😂","😍","😎","🤔","😱","😭","🥳",
  "👍","👏","🙌","🔥","💥","🎮","🕹️","🏆",
  "❤️","💙","✨","⚡","🚀","💯","🤣","😅",
];

const REACTIONS = ["👍", "❤️", "😂", "🎉", "👏", "🔥", "😮", "🎮"];

type ChatMessage = { id: number; text: string; time: string };
type FloatingReaction = { id: number; emoji: string; left: number };

export const Route = createFileRoute("/viewer")({
  head: () => ({
    meta: [
      { title: "Assistindo uma sala — Game Stream" },
      {
        name: "description",
        content:
          "Assista à tela compartilhada em baixa latência, com áudio, tela cheia total e métricas de conexão.",
      },
      { property: "og:title", content: "Assistindo uma sala — Game Stream" },
      {
        property: "og:description",
        content: "Tela grande, áudio e conexão em tempo real com a sua galera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ViewerScreen,
});

function ViewerScreen() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [stats, setStats] = useState(true);
  const [room, setRoom] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setRoom(readRoomCode()), []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void stageRef.current?.requestFullscreen?.();
    }
  };

  // Atalhos de teclado: F alterna, Esc sai
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "Escape" && document.fullscreenElement) {
        void document.exitFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-ocultar os controles flutuantes em tela cheia
  useEffect(() => {
    if (!isFull) {
      setOverlayVisible(true);
      return;
    }
    const reveal = () => {
      setOverlayVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setOverlayVisible(false), 2800);
    };
    reveal();
    window.addEventListener("mousemove", reveal);
    window.addEventListener("touchstart", reveal);
    window.addEventListener("keydown", reveal);
    return () => {
      window.removeEventListener("mousemove", reveal);
      window.removeEventListener("touchstart", reveal);
      window.removeEventListener("keydown", reveal);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isFull]);

  const participants: number = 1;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [floating, setFloating] = useState<FloatingReaction[]>([]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
    setEmojiOpen(false);
  };

  const react = (emoji: string) => {
    const id = Date.now() + Math.random();
    setFloating((prev) => [...prev, { id, emoji, left: 10 + Math.random() * 70 }]);
    setTimeout(() => setFloating((prev) => prev.filter((r) => r.id !== id)), 2600);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          {room && (
            <span className="hidden truncate rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:inline">
              {room}
            </span>
          )}
        </div>
        <span className="flex items-center gap-2 rounded-full border border-magenta/60 bg-magenta/10 px-3 py-1.5 text-xs text-magenta">
          <StatusDot tone="live" /> Ao vivo
        </span>
      </header>

      <main className="mt-5 grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <div className="surface overflow-hidden p-2 sm:p-3">
            <div
              ref={stageRef}
              onDoubleClick={toggleFullscreen}
              className={cn(
                "relative w-full overflow-hidden border border-border bg-[oklch(0.1_0.03_265)]",
                isFull ? "h-screen rounded-none" : "aspect-video rounded-xl",
              )}
            >
              <Framed className="absolute inset-6" tone="cyan">
                <div className="grid h-full place-items-center">
                  <div className="text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-primary-foreground">
                      <Play size={22} />
                    </span>
                    <p className="mt-3 text-sm text-foreground">Transmissão da sala</p>
                    <p className="text-xs text-muted-foreground">1080p · 60fps · 24 ms</p>
                  </div>
                </div>
              </Framed>
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity duration-300",
                  overlayVisible ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-background/70 px-2.5 py-1 text-[11px] text-foreground backdrop-blur">
                  <StatusDot tone="online" /> Conectado
                </span>

                {isFull && (
                  <div className="pointer-events-auto absolute right-3 top-3 flex items-center gap-2">
                    <button
                      onClick={() => setMuted((v) => !v)}
                      className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur transition-colors hover:text-cyan"
                      aria-label={muted ? "Ativar áudio" : "Silenciar"}
                    >
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="flex h-11 items-center gap-2 rounded-full border border-magenta/60 bg-magenta/15 px-4 text-xs text-magenta backdrop-blur transition-colors hover:bg-magenta/25"
                      aria-label="Sair da tela cheia"
                    >
                      <Minimize2 size={16} /> Sair da tela cheia
                      <span className="hidden font-mono text-[10px] opacity-70 sm:inline">Esc</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={toggleFullscreen}
                  className="pointer-events-auto absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-[11px] text-foreground backdrop-blur transition-colors hover:text-cyan"
                  aria-label={isFull ? "Sair da tela cheia" : "Tela cheia total"}
                >
                  {isFull ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  {isFull ? "Sair da tela cheia" : "Tela cheia total"}
                </button>

                {showHint && !isFull && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/70 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur">
                    Dica: clique duplo no vídeo ou tecle{" "}
                    <span className="font-mono text-cyan">F</span> para tela cheia
                  </span>
                )}
              </div>
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
                <GsButton
                  icon={isFull ? Minimize2 : Maximize2}
                  onClick={toggleFullscreen}
                  className="h-10 px-3"
                >
                  <span className="hidden sm:inline">
                    {isFull ? "Sair da tela cheia" : "Tela cheia"}
                  </span>
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
            </Panel>
          )}
        </div>

        <aside className="min-w-0 space-y-4">
          <Panel
            title="Na sala"
            action={
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users size={14} /> {participants}
              </span>
            }
          >
            <p className="text-sm text-muted-foreground">
              {participants === 1
                ? "Só você por aqui. Compartilhe o link da sala para chamar a galera."
                : `${participants} pessoas conectadas nesta sala.`}
            </p>
          </Panel>

          <Panel title="Chat da sala">
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma mensagem ainda. Diga um oi para a galera.
                </p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-medium text-cyan">Você</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="mt-0.5 break-words text-sm text-foreground">{m.text}</p>
                  </div>
                ))
              )}
            </div>

            {emojiOpen && (
              <div className="mt-3 grid grid-cols-8 gap-1 rounded-xl border border-border/70 bg-secondary/40 p-2">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setDraft((d) => d + e)}
                    className="grid h-8 place-items-center rounded-md text-lg transition-colors hover:bg-secondary"
                    aria-label={`Inserir ${e}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2"
            >
              <button
                type="button"
                onClick={() => setEmojiOpen((v) => !v)}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-lg border transition-colors",
                  emojiOpen
                    ? "border-cyan/60 text-cyan"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
                aria-label="Emojis"
              >
                <Smile size={18} />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Manda algo..."
                className="h-10 min-w-0 rounded-lg border border-input bg-secondary/40 px-3 text-sm outline-none focus:border-electric"
              />
              <GsButton
                type="submit"
                icon={MessageSquare}
                className="h-10 w-10 px-0"
                aria-label="Enviar"
              />
            </form>
          </Panel>

          <Panel title="Reações">
            <div className="flex flex-wrap gap-2">
              {REACTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => react(e)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 text-lg transition-transform hover:scale-110 hover:border-cyan/60"
                  aria-label={`Reagir com ${e}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </Panel>
        </aside>
      </main>
    </div>
  );
}
