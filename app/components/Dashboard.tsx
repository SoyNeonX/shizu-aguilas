"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "./Header";
import { AlarmCard } from "./AlarmCard";
import { CO2Gauge } from "./CO2Gauge";
import { SensorGrid } from "./SensorGrid";
import { EventLog } from "./EventLog";
import { Controls } from "./Controls";
import { PinModal } from "./PinModal";
import { SettingsModal } from "./SettingsModal";
import type { EstadoSistema } from "@/lib/store";

export function Dashboard() {
  const [data, setData] = useState<EstadoSistema | null>(null);
  const [espConnected, setEspConnected] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pinError, setPinError] = useState("");

  const fetchEstado = useCallback(async () => {
    try {
      const res = await fetch("/api/telemetria");
      const json: EstadoSistema = await res.json();
      setData(json);

      if (json.lastPostAt) {
        setEspConnected(Date.now() - json.lastPostAt < 10_000);
      } else {
        setEspConnected(false);
      }
    } catch {
      setEspConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchEstado();
    const id = setInterval(fetchEstado, 2000);
    return () => clearInterval(id);
  }, [fetchEstado]);

  const sendTelemetria = async (overrides: Record<string, unknown>) => {
    const base = data?.telemetria ?? {
      estadoAlarma: 0,
      co2Ppm: 415,
      puertaPrincipal: false,
      ventanaCocina: false,
      ultimoEvento: "Sistema OK",
    };
    try {
      await fetch("/api/telemetria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...base, ...overrides }),
      });
      fetchEstado();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDisarm = async () => {
    try {
      const res = await fetch("/api/telemetria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estadoAlarma: 0,
          co2Ppm: data?.telemetria.co2Ppm ?? 415,
          puertaPrincipal: data?.telemetria.puertaPrincipal ?? false,
          ventanaCocina: data?.telemetria.ventanaCocina ?? false,
          ultimoEvento: "Sistema Desarmado por PIN",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPinOpen(false);
        setPinError("");
        fetchEstado();
      }
    } catch {
      setPinError("Error de conexion");
    }
  };

  const handlePinSubmit = (pin: string) => {
    if (pin === "00000") {
      handleDisarm();
    } else {
      setPinError("PIN incorrecto");
    }
  };

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-cyan-500" />
          <p className="font-mono text-xs text-zinc-500">CONECTANDO CON SHIZU...</p>
        </div>
      </div>
    );
  }

  const t = data.telemetria;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Scan line */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.04]">
        <div className="scan-line h-[1px] w-full bg-cyan-400" />
      </div>

      <Header espConnected={espConnected} />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 lg:col-span-8">
            <AlarmCard estado={t.estadoAlarma} />

            <Controls
              onDisarm={() => { setPinError(""); setPinOpen(true); }}
              onSettings={() => setSettingsOpen(true)}
              alarmEstado={t.estadoAlarma}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <CO2Gauge ppm={t.co2Ppm} />
              <SensorGrid
                puertaPrincipal={t.puertaPrincipal}
                ventanaCocina={t.ventanaCocina}
              />
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4">
            <EventLog eventos={data.eventos} />
          </div>
        </div>
      </main>

      <PinModal
        isOpen={pinOpen}
        onClose={() => { setPinOpen(false); setPinError(""); }}
        onSubmit={handlePinSubmit}
        error={pinError}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
