"use client";

import { ShieldOff, ShieldCheck, ShieldAlert } from "lucide-react";

interface AlarmCardProps {
  estado: 0 | 1 | 2;
}

const config = {
  0: {
    label: "DESARMADA",
    sub: "Sin vigilancia activa",
    icon: ShieldOff,
    gradient: "from-emerald-500/10 to-emerald-500/[0.02]",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500",
    text: "text-emerald-400",
    glow: "glow-emerald",
  },
  1: {
    label: "ARMADA",
    sub: "Vigilancia activa",
    icon: ShieldCheck,
    gradient: "from-amber-500/10 to-amber-500/[0.02]",
    border: "border-amber-500/30",
    badge: "bg-amber-500",
    text: "text-amber-400",
    glow: "glow-amber",
  },
  2: {
    label: "INTRUSION!",
    sub: "ALARMA DISPARADA",
    icon: ShieldAlert,
    gradient: "from-red-600/15 to-red-500/[0.02]",
    border: "border-red-500/50",
    badge: "bg-red-600",
    text: "text-red-400",
    glow: "glow-red",
  },
};

export function AlarmCard({ estado }: AlarmCardProps) {
  const c = config[estado];
  const Icon = c.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 ${c.gradient} ${c.border} ${c.glow}`}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative flex items-center gap-5">
        <div
          className={`rounded-2xl p-4 ${c.badge} ${
            estado === 2 ? "animate-pulse-alarm" : ""
          }`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Estado de Alarma
          </p>
          <h2
            className={`text-3xl font-black uppercase tracking-wider ${
              estado === 2 ? "animate-pulse-alarm" : ""
            } ${c.text}`}
          >
            {c.label}
          </h2>
          <p className="text-xs text-zinc-500">{c.sub}</p>
        </div>
      </div>
    </div>
  );
}
