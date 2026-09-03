"use client";

import { DoorOpen, DoorClosed, Square, SquareStack } from "lucide-react";

interface Sensor {
  id: string;
  name: string;
  type: "door" | "window";
  open: boolean;
}

interface SensorGridProps {
  puertaPrincipal: boolean;
  ventanaCocina: boolean;
}

export function SensorGrid({ puertaPrincipal, ventanaCocina }: SensorGridProps) {
  const sensors: Sensor[] = [
    { id: "pp", name: "Puerta Principal", type: "door", open: puertaPrincipal },
    { id: "vc", name: "Ventana Cocina", type: "window", open: ventanaCocina },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        Sensores Perimetrales
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {sensors.map((s) => (
          <div
            key={s.id}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
              s.open
                ? "border-red-500/40 bg-red-500/10 glow-red"
                : "border-zinc-800 bg-zinc-800/30"
            }`}
          >
            {s.type === "door" ? (
              s.open ? (
                <DoorOpen className="h-8 w-8 text-red-400" />
              ) : (
                <DoorClosed className="h-8 w-8 text-emerald-400" />
              )
            ) : s.open ? (
              <Square className="h-8 w-8 text-red-400" />
            ) : (
              <SquareStack className="h-8 w-8 text-emerald-400" />
            )}

            <span className="text-xs font-bold text-zinc-300">{s.name}</span>

            <span
              className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase ${
                s.open
                  ? "bg-red-500/20 text-red-400"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
            >
              {s.open ? "ABIERTA" : "OK"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
