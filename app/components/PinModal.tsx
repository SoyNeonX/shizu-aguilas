"use client";

import { useState } from "react";
import { X, Delete, KeyRound } from "lucide-react";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  error?: string;
}

export function PinModal({ isOpen, onClose, onSubmit, error }: PinModalProps) {
  const [pin, setPin] = useState("");
  if (!isOpen) return null;

  const add = (d: string) => pin.length < 5 && setPin(pin + d);
  const del = () => setPin(pin.slice(0, -1));
  const ok = () => {
    if (pin.length === 5) {
      onSubmit(pin);
      setPin("");
    }
  };
  const close = () => {
    onClose();
    setPin("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-cyan-500" />
            <h2 className="text-lg font-bold text-white">Desarmar Sistema</h2>
          </div>
          <button onClick={close} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all ${
                i < pin.length
                  ? "border-cyan-500 bg-cyan-500/15 text-cyan-400 scale-110"
                  : "border-zinc-700 bg-zinc-800 text-zinc-700"
              }`}
            >
              {i < pin.length ? "*" : ""}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button
              key={d}
              onClick={() => add(d)}
              className="rounded-xl bg-zinc-800 py-3.5 text-lg font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95"
            >
              {d}
            </button>
          ))}
          <button
            onClick={del}
            className="rounded-xl bg-zinc-800 py-3.5 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-white active:scale-95"
          >
            <Delete className="mx-auto h-5 w-5" />
          </button>
          <button
            onClick={() => add("0")}
            className="rounded-xl bg-zinc-800 py-3.5 text-lg font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95"
          >
            0
          </button>
          <button
            onClick={ok}
            disabled={pin.length !== 5}
            className="rounded-xl bg-cyan-600 py-3.5 font-bold text-white transition-all hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-30 active:scale-95"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
