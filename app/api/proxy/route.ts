import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const target = req.nextUrl.searchParams.get("url");

    if (!target) {
        return new Response("Missing url", { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000); // 20 second timeout

        const response = await fetch(target, {
            signal: controller.signal,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Referer": target,
            },
        });

        clearTimeout(timeout);

        const contentType =
            response.headers.get("content-type") || "";

        if (
            target.endsWith(".m3u8") ||
            contentType.includes("mpegurl") ||
            contentType.includes("m3u8")
        ) {
            let text = await response.text();
            const base = new URL(response.url);

            text = text.replace(/^([^#].+)$/gm, (line) => {
                const trimmed = line.trim();
                if (!trimmed) return line;
                try {
                    const absolute = new URL(trimmed, base).href;
                    if (absolute.includes('/api/proxy?url=')) return absolute;
                    return `/api/proxy?url=${encodeURIComponent(absolute)}`;
                } catch {
                    return line;
                }
            });

            return new Response(text, {
                headers: {
                    "Content-Type":
                        "application/vnd.apple.mpegurl",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                    "Cache-Control": "no-cache, no-store",
                },
            });
        }

        // For TS segments and other binary content
        const buffer = await response.arrayBuffer();
        return new Response(buffer, {
            headers: {
                "Content-Type":
                    contentType || "video/mp2t",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "*",
                "Cache-Control": "no-cache",
            },
        });
    } catch (err: unknown) {
        const isAbort = err instanceof Error && err.name === "AbortError";
        const message = isAbort
            ? "Stream timeout - server could not reach the source"
            : `Proxy Error: ${err instanceof Error ? err.message : "Unknown error"}`;

        return new Response(JSON.stringify({ error: message }), {
            status: isAbort ? 504 : 502,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
    });
}