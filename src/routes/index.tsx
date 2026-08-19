import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MonitorUp, KeyRound, Users, Lock, Zap, Dices } from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, Panel } from "@/components/gs/controls";
import heroLogo from "@/assets/gamestream-hero.png.asset.json";
import { generateRoomCode, saveRoomCode } from "@/lib/room";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Game Stream — Sua tela. Sua sala. Sua galera." },
      {
        name: "description",
        content:
          "Crie uma sala privada, compartilhe sua tela em baixa latência e assista junto com os amigos.",
      },
      { property: "og:title", content: "Game Stream — Sua tela. Sua sala. Sua galera." },
      {
        property: "og:description",
        content: "Compartilhe sua tela e assista junto com os amigos em salas privadas.",
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
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Logo />
        <span className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          <StatusDot /> conectado
        </span>
      </header>

      <main className="mt-8 flex-1 space-y-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="sr-only">Game Stream — Sua tela. Sua sala. Sua galera.</h1>
          <img
            src={heroLogo.url}
            alt="Game Stream — sua tela, sua sala, sua galera"
            className="w-full max-w-2xl"
          />
          <p className="-mt-4 max-w-xl text-sm text-muted-foreground sm:-mt-8">
            Abra uma sala, manda o link no grupo e joguem juntos. Sem público, sem seguidores — só a
            sua galera.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Panel title="Criar sala" className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <Framed className="rounded-xl bg-secondary/30 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  código da sua sala
                </p>
                <p
                  className={
                    myCode
                      ? "mt-2 font-display text-3xl font-bold text-brand-gradient sm:text-4xl"
                      : "mt-2 font-display text-3xl font-bold tracking-[0.25em] text-muted-foreground/50 sm:text-4xl"
                  }
                >
                  {myCode || "······"}
                </p>
              </Framed>
              <GsButton
                icon={Dices}
                className="w-full"
                onClick={() => setMyCode(generateRoomCode())}
              >
                {myCode ? "Gerar outro código" : "Gerar código"}
              </GsButton>
              <p className="text-sm text-muted-foreground">
                Você entra como host, compartilha a tela e controla áudio e qualidade.
              </p>
            </div>
            <GsButton variant="primary" icon={MonitorUp} className="w-full" onClick={startHost}>
              Compartilhar tela
            </GsButton>
          </Panel>

          <Panel title="Entrar em uma sala" className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <label className="block text-sm text-muted-foreground" htmlFor="room-code">
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
              <p className="text-xs text-muted-foreground">
                Recebeu um link? Ele abre a sala direto no player.
              </p>
            </div>
            <GsButton icon={KeyRound} className="w-full" onClick={join} disabled={!code.trim()}>
              Entrar na sala
            </GsButton>
          </Panel>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Baixa latência", text: "Transmissão direta, sem atraso de live." },
            { icon: Lock, title: "Sala privada", text: "Só entra quem tem o código ou o link." },
            { icon: Users, title: "Juntos", text: "Áudio, chat e a mesma tela pra todo mundo." },
          ].map((f) => (
            <li key={f.title} className="rounded-xl border border-border/70 bg-card/40 p-4">
              <f.icon size={18} className="text-cyan" />
              <p className="mt-2 text-sm font-medium text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ul>
      </main>

      <footer className="mt-8 text-xs text-muted-foreground">
        Game Stream · Stream together. Instantly.
      </footer>
    </div>
  );
}
