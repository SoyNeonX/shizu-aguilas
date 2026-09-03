"use client";

import { useState } from "react";
import { X, KeyRound, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (pin.length !== 5) {
      setMsg("El PIN debe tener 5 digitos");
      setSuccess(false);
      return;
    }

    try {
      const res = await fetch("/api/telemetria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estadoAlarma: 0,
          co2Ppm: 415,
          puertaPrincipal: false,
          ventanaCocina: false,
          ultimoEvento: `PIN '${pin}' ingresado en ajustes`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("PIN registrado correctamente");
        setSuccess(true);
        setPin("");
      }
    } catch {
      setMsg("Error de conexion");
      setSuccess(false);
    }
  };

  const close = () => {
    setPin("");
    setMsg("");
    setSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-cyan-500" />
            <h2 className="text-lg font-bold text-white">Configuracion</h2>
          </div>
          <button onClick={close} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">PIN de Acceso</label>
            <input
              type="password"
              maxLength={5}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none"
              placeholder="•••••"
            />
          </div>

          {msg && (
            <div
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
                success
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400"
              }`}
            >
              {success ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              {msg}
            </div>
          )}

          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-800/50 p-3">
            <Clock className="h-4 w-4 text-zinc-500" />
            <p className="text-xs text-zinc-500">El reloj se sincroniza automaticamente con la hora del servidor.</p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-cyan-600 py-3.5 font-bold text-white transition-all hover:bg-cyan-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
