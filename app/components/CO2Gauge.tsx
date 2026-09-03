"use client";

import { Wind } from "lucide-react";

interface CO2GaugeProps {
  ppm: number;
}

export function CO2Gauge({ ppm }: CO2GaugeProps) {
  const getCfg = () => {
    if (ppm < 800) return { text: "text-emerald-400", bar: "bg-emerald-500", label: "AIRE LIMPIO", ring: "ring-emerald-500/30" };
    if (ppm <= 1200) return { text: "text-amber-400", bar: "bg-amber-500", label: "VENTILAR", ring: "ring-amber-500/30" };
    return { text: "text-red-400", bar: "bg-red-500", label: "CO2 ALTO", ring: "ring-red-500/30" };
  };

  const c = getCfg();
  const pct = Math.min(100, (ppm / 2000) * 100);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        CO2 - Calidad de Aire
      </h3>

      <div className="flex flex-col items-center gap-3">
        <div className={`relative flex h-28 w-28 items-center justify-center rounded-full ring-4 ${c.ring} bg-zinc-800/60`}>
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#27272a" strokeWidth="5" />
            <circle
              cx="50" cy="50" r="44" fill="none" strokeWidth="5" strokeLinecap="round"
              className={`${c.bar} transition-all duration-700`}
              strokeDasharray={`${pct * 2.764} 276.46`}
            />
          </svg>
          <div className="text-center">
            <Wind className={`mx-auto mb-0.5 h-5 w-5 ${c.text}`} />
            <div className={`text-2xl font-black ${c.text}`}>{ppm}</div>
            <div className="text-[10px] text-zinc-600">PPM</div>
          </div>
        </div>

        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${c.text} bg-zinc-800`}>
          {c.label}
        </span>
      </div>
    </div>
  );
}
