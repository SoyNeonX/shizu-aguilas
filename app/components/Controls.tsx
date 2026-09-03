"use client";

import { ShieldCheck, ShieldOff, Settings } from "lucide-react";

interface ControlsProps {
  onDisarm: () => void;
  onSettings: () => void;
  alarmEstado: 0 | 1 | 2;
}

export function Controls({ onDisarm, onSettings, alarmEstado }: ControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onDisarm}
        disabled={alarmEstado === 0}
        className="group flex items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 font-semibold text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ShieldOff className="h-5 w-5 transition-transform group-hover:scale-110" />
        <div className="text-left">
          <div className="text-sm font-bold">Desarmar</div>
          <div className="text-[10px] text-red-500/60">Requiere PIN</div>
        </div>
      </button>

      <button
        onClick={onSettings}
        className="group flex items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-4 font-semibold text-zinc-300 transition-all hover:bg-zinc-700/50 hover:border-zinc-600"
      >
        <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
        <div className="text-left">
          <div className="text-sm font-bold">Ajustes</div>
          <div className="text-[10px] text-zinc-500">Configuracion</div>
        </div>
      </button>
    </div>
  );
}
