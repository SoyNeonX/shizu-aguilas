export interface Telemetria {
  estadoAlarma: 0 | 1 | 2;
  co2Ppm: number;
  puertaPrincipal: boolean;
  ventanaCocina: boolean;
  ultimoEvento: string;
}

export interface Evento {
  id: string;
  timestamp: string;
  mensaje: string;
}

export interface EstadoSistema {
  telemetria: Telemetria;
  eventos: Evento[];
  lastPostAt: number | null;
}

const MAX_EVENTOS = 10;

const defaultTelemetria: Telemetria = {
  estadoAlarma: 0,
  co2Ppm: 415,
  puertaPrincipal: false,
  ventanaCocina: false,
  ultimoEvento: "Sistema OK",
};

let estado: EstadoSistema = {
  telemetria: { ...defaultTelemetria },
  eventos: [],
  lastPostAt: null,
};

function formatTime(d: Date): string {
  return d.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function recibirTelemetria(data: Telemetria): void {
  const now = new Date();
  estado.telemetria = { ...data };
  estado.lastPostAt = Date.now();

  const evento: Evento = {
    id: crypto.randomUUID(),
    timestamp: `${formatTime(now)} ${formatDate(now)}`,
    mensaje: data.ultimoEvento,
  };
  estado.eventos = [evento, ...estado.eventos].slice(0, MAX_EVENTOS);
}

export function getEstado(): EstadoSistema {
  return JSON.parse(JSON.stringify(estado));
}

export function isEspConnected(): boolean {
  if (!estado.lastPostAt) return false;
  return Date.now() - estado.lastPostAt < 10_000;
}

export function addEvento(mensaje: string): void {
  const now = new Date();
  const evento: Evento = {
    id: crypto.randomUUID(),
    timestamp: `${formatTime(now)} ${formatDate(now)}`,
    mensaje,
  };
  estado.eventos = [evento, ...estado.eventos].slice(0, MAX_EVENTOS);
}
