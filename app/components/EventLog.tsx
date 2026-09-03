"use client";

import { ScrollText, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { Evento } from "@/lib/store";

interface EventLogProps {
  eventos: Evento[];
}

function getIcon(msg: string) {
  if (msg.includes("DISPARADA") || msg.includes("INTRUSION") || msg.includes("incorrecto"))
    return <AlertTriangle className="h-3.5 w-3.5 text-red-400" />;
  if (msg.includes("OK") || msg.includes("ARMADO") || msg.includes("Desarmada"))
    return <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />;
  return <Info className="h-3.5 w-3.5 text-zinc-500" />;
}

function getColor(msg: string) {
  if (msg.includes("DISPARADA") || msg.includes("INTRUSION")) return "border-red-500/30 bg-red-500/5";
  if (msg.includes("incorrecto")) return "border-amber-500/20 bg-amber-500/5";
  if (msg.includes("OK") || msg.includes("ARMADO") || msg.includes("Desarmada"))
    return "border-emerald-500/20 bg-emerald-500/5";
  return "border-zinc-800 bg-zinc-800/30";
}

export function EventLog({ eventos }: EventLogProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        <ScrollText className="h-3.5 w-3.5" />
        Historial de Eventos
        {eventos.length > 0 && (
          <span className="ml-auto rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
            {eventos.length}
          </span>
        )}
      </h3>

      <div className="max-h-[500px] flex-1 space-y-2 overflow-y-auto">
        {eventos.length === 0 ? (
          <div className="flex h-24 items-center justify-center">
            <p className="text-xs text-zinc-600">Sin eventos</p>
          </div>
        ) : (
          eventos.map((e) => (
            <div
              key={e.id}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${getColor(e.mensaje)}`}
            >
              <div className="mt-0.5 shrink-0">{getIcon(e.mensaje)}</div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] text-zinc-600">{e.timestamp}</span>
                <p className="text-xs text-zinc-300">{e.mensaje}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
