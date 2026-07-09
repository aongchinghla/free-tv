import { NextRequest, NextResponse } from "next/server";

const activeViewers: Record<string, Record<string, number>> = {};
const TIMEOUT = 12000; // 12 seconds threshold for inactive clients

function cleanAndCount(id: string): number {
  if (!activeViewers[id]) return 0;
  const now = Date.now();
  for (const clientId in activeViewers[id]) {
    if (now - activeViewers[id][clientId] > TIMEOUT) {
      delete activeViewers[id][clientId];
    }
  }
  return Object.keys(activeViewers[id]).length;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing channel id" }, { status: 400 });
  }
  const count = cleanAndCount(id);
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, clientId, action } = body;

    if (!id || !clientId) {
      return NextResponse.json({ error: "Missing id or clientId" }, { status: 400 });
    }

    if (!activeViewers[id]) {
      activeViewers[id] = {};
    }

    if (action === "disconnect") {
      delete activeViewers[id][clientId];
    } else {
      activeViewers[id][clientId] = Date.now();
    }

    const count = cleanAndCount(id);
    return NextResponse.json({ count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
