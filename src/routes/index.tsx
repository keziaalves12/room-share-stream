import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MonitorUp, KeyRound, Lock, Zap, Dices, Users } from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, Panel } from "@/components/gs/controls";
import { generateRoomCode, saveRoomCode } from "@/lib/room";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Game Stream — sala, tela e a sua galera" },
      {
        name: "description",
        content:
          "Crie uma sala, compartilhe sua tela em baixa latência e assista junto com os amigos.",
      },
      { property: "og:title", content: "Game Stream — sala, tela e a sua galera" },
      {
        property: "og:description",
        content: "Crie uma sala ou entre com um código e assista junto com os amigos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [code, setCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const navigate = useNavigate();

  const startHost = () => {
    const c = myCode || generateRoomCode();
    saveRoomCode(c);
    void navigate({ to: "/host" });
  };

  const join = () => {
    if (!code.trim()) return;
    saveRoomCode(code.trim());
    void navigate({ to: "/viewer" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 pb-3">
        <Logo />
        <span className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          <StatusDot /> pronto
        </span>
      </header>

      <h1 className="sr-only">Game Stream — crie uma sala ou entre em uma sala</h1>

      <main className="grid flex-1 content-center gap-3 py-4 lg:grid-cols-2">
        <Panel title="Criar sala" className="flex flex-col gap-4">
          <Framed className="rounded-xl bg-secondary/30 px-4 py-4 text-center" tone="magenta">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              código da sua sala
            </p>
            <p
              className={
                myCode
                  ? "mt-1 font-display text-3xl font-bold text-brand-gradient"
                  : "mt-1 font-display text-3xl font-bold tracking-[0.25em] text-muted-foreground/50"
              }
            >
              {myCode || "······"}
            </p>
          </Framed>

          <div className="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)]">
            <GsButton icon={Dices} onClick={() => setMyCode(generateRoomCode())}>
              {myCode ? "Outro código" : "Gerar código"}
            </GsButton>
            <GsButton variant="primary" icon={MonitorUp} onClick={startHost}>
              Compartilhar tela
            </GsButton>
          </div>

          <p className="text-xs text-muted-foreground">
            Você entra como host: controla a tela, o áudio e a qualidade da sala.
          </p>
        </Panel>

        <Panel title="Entrar em uma sala" className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="block text-xs text-muted-foreground" htmlFor="room-code">
              Código da sala
            </label>
            <input
              id="room-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && join()}
              placeholder="GS-0000"
              className="h-14 w-full rounded-xl border border-input bg-secondary/40 px-4 text-center font-display text-xl tracking-[0.3em] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-cyan focus:shadow-[0_0_28px_-10px_var(--cyan)]"
            />
          </div>

          <GsButton icon={KeyRound} className="w-full" onClick={join} disabled={!code.trim()}>
            Entrar na sala
          </GsButton>

          <p className="text-xs text-muted-foreground">
            Recebeu um link? Ele abre a sala direto no player.
          </p>
        </Panel>

        <ul className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3 lg:col-span-2">
          {[
            { icon: Zap, text: "Baixa latência" },
            { icon: Lock, text: "Sala privada" },
            { icon: Users, text: "Assistir juntos" },
          ].map((f) => (
            <li
              key={f.text}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2"
            >
              <f.icon size={14} className="shrink-0 text-cyan" />
              {f.text}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
