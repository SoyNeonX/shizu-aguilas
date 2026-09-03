import { NextRequest, NextResponse } from "next/server";
import { recibirTelemetria, getEstado, addEvento } from "../../../lib/store";
import type { Telemetria } from "../../../lib/store";

export async function POST(request: NextRequest) {
  try {
    const data: Telemetria = await request.json();
    recibirTelemetria(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "JSON inválido" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const estado = getEstado();
  return NextResponse.json(estado);
}
