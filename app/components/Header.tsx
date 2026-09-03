"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, Zap } from "lucide-react";

interface HeaderProps {
  espConnected: boolean;
}

export function Header({ espConnected }: HeaderProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (d: Date) =>
    d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const fmtDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-cyan-500" />
          <span className="text-lg font-black tracking-widest text-white">
            SHIZU<span className="text-cyan-500">.</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* ESP32 status */}
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${
              espConnected
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {espConnected ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            {espConnected ? "ESP32 CONECTADO" : "ESP32 SIN SENAL"}
          </div>

          {/* Clock */}
          {now && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-right">
              <div className="font-mono text-sm font-semibold tabular-nums text-white">{fmt(now)}</div>
              <div className="font-mono text-[10px] text-zinc-500">{fmtDate(now)}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
