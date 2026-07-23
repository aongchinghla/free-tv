import { NextRequest, NextResponse } from "next/server";

const activeViewers: Record<string, Record<string, number>> = {};
const TIMEOUT = 12000; // 12 seconds threshold for inactive clients

function cleanAndCountTotal(): number {
  const now = Date.now();
  const uniqueClients = new Set<string>();

  for (const channelId in activeViewers) {
    for (const clientId in activeViewers[channelId]) {
      if (now - activeViewers[channelId][clientId] > TIMEOUT) {
        delete activeViewers[channelId][clientId];
      } else {
        uniqueClients.add(clientId);
      }
    }
    if (Object.keys(activeViewers[channelId]).length === 0) {
      delete activeViewers[channelId];
    }
  }
  return uniqueClients.size;
}

export async function GET() {
  const count = cleanAndCountTotal();
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
      if (Object.keys(activeViewers[id]).length === 0) {
        delete activeViewers[id];
      }
    } else {
      activeViewers[id][clientId] = Date.now();
    }

    const count = cleanAndCountTotal();
    return NextResponse.json({ count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
