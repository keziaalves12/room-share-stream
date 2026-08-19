import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MonitorUp, KeyRound, Users, Lock, Zap, ArrowRight } from "lucide-react";
import { Framed, Logo, StatusDot } from "@/components/gs/brand";
import { GsButton, Panel } from "@/components/gs/controls";

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
    ],
  }),
  component: Home,
});

const recentRooms = [
  { code: "GS-7K2P", host: "Você", people: 4, when: "há 2 h" },
  { code: "GS-3XQ9", host: "Lucas", people: 2, when: "ontem" },
  { code: "GS-M04T", host: "Bia", people: 6, when: "seg." },
];

function Home() {
  const [code, setCode] = useState("");

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Logo />
        <span className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          <StatusDot /> conectado
        </span>
      </header>

      <main className="mt-8 flex-1 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            SUA TELA. SUA SALA.{" "}
            <span className="text-brand-gradient">SUA GALERA.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
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
                <p className="mt-2 font-display text-3xl font-bold text-brand-gradient sm:text-4xl">
                  GS-7K2P
                </p>
              </Framed>
              <p className="text-sm text-muted-foreground">
                Você entra como host, compartilha a tela e controla áudio e qualidade.
              </p>
            </div>
            <Link to="/host">
              <GsButton variant="primary" icon={MonitorUp} className="w-full">
                Compartilhar tela
              </GsButton>
            </Link>
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
                placeholder="GS-0000"
                className="h-14 w-full rounded-xl border border-input bg-secondary/40 px-4 text-center font-display text-xl tracking-[0.3em] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-cyan focus:shadow-[0_0_28px_-10px_var(--cyan)]"
              />
              <p className="text-xs text-muted-foreground">
                Recebeu um link? Ele abre a sala direto no player.
              </p>
            </div>
            <Link to="/viewer">
              <GsButton icon={KeyRound} className="w-full">
                Entrar na sala
              </GsButton>
            </Link>
          </Panel>
        </div>

        <Panel title="Salas recentes">
          <ul className="grid gap-3 sm:grid-cols-3">
            {recentRooms.map((r) => (
              <li key={r.code}>
                <Link
                  to="/viewer"
                  className="block rounded-xl border border-border bg-secondary/30 p-4 transition-all hover:border-electric/70 hover:shadow-[0_0_28px_-14px_var(--electric)]"
                >
                  <span className="font-display text-sm text-foreground">{r.code}</span>
                  <span className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Users size={14} /> {r.people} amigos · host {r.host}
                  </span>
                  <span className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    {r.when}
                    <ArrowRight size={14} className="text-electric" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

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
