import { NextRequest } from "next/server";

// Rewrite any URI that looks like a segment or resource URL through our proxy
function proxyUri(uri: string, base: URL): string {
    try {
        const absolute = new URL(uri, base).href;
        // Avoid double-wrapping
        if (absolute.includes("/api/proxy?url=")) return absolute;
        return `/api/proxy?url=${encodeURIComponent(absolute)}`;
    } catch {
        return uri;
    }
}

// Guess content type for binary media files
function guessMediaContentType(url: string, fallback: string): string {
    const u = url.split("?")[0].toLowerCase();
    if (u.endsWith(".ts")) return "video/mp2t";
    if (u.endsWith(".aac")) return "audio/aac";
    if (u.endsWith(".mp4") || u.endsWith(".m4s") || u.endsWith(".fmp4")) return "video/mp4";
    if (u.endsWith(".mp3")) return "audio/mpeg";
    if (u.endsWith(".m4a")) return "audio/mp4";
    if (u.endsWith(".vtt")) return "text/vtt";
    if (u.endsWith(".key")) return "application/octet-stream";
    return fallback || "video/mp2t";
}

function rewriteM3U8(text: string, base: URL): string {
    return text
        // Rewrite #EXT-X-MAP:URI="..." attribute
        .replace(/#EXT-X-MAP:URI="([^"]+)"/g, (_m, uri) => {
            return `#EXT-X-MAP:URI="${proxyUri(uri, base)}"`;
        })
        // Rewrite #EXT-X-KEY:...,URI="..." attribute
        .replace(/(#EXT-X-KEY:[^"]*URI=")([^"]+)(")/g, (_m, before, uri, after) => {
            return `${before}${proxyUri(uri, base)}${after}`;
        })
        // Rewrite bare segment lines (lines not starting with #)
        .replace(/^([^#\s].+)$/gm, (line) => {
            const trimmed = line.trim();
            if (!trimmed) return line;
            return proxyUri(trimmed, base);
        });
}

export async function GET(req: NextRequest) {
    const rawTarget = req.nextUrl.searchParams.get("url");

    if (!rawTarget) {
        return new Response("Missing url parameter", { status: 400 });
    }

    // Decode in case the url was double-encoded
    let target = rawTarget;
    try {
        const decoded = decodeURIComponent(rawTarget);
        if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
            target = decoded;
        }
    } catch { /* keep original */ }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(target, {
            signal: controller.signal,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "Origin": "https://www.google.com",
                "Referer": "https://www.google.com/",
            },
        });

        clearTimeout(timeout);

        if (!response.ok && response.status !== 200) {
            return new Response(
                JSON.stringify({ error: `Upstream returned ${response.status} ${response.statusText}` }),
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        const contentType = response.headers.get("content-type") || "";
        const isM3U8 =
            target.split("?")[0].endsWith(".m3u8") ||
            contentType.includes("mpegurl") ||
            contentType.includes("m3u8");

        if (isM3U8) {
            const text = await response.text();
            const base = new URL(response.url);
            const rewritten = rewriteM3U8(text, base);

            return new Response(rewritten, {
                headers: {
                    "Content-Type": "application/vnd.apple.mpegurl",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                    "Cache-Control": "no-cache, no-store",
                },
            });
        }

        // Binary media segment (TS, fMP4, etc.)
        const buffer = await response.arrayBuffer();
        const mediaType = guessMediaContentType(target, contentType);

        return new Response(buffer, {
            headers: {
                "Content-Type": mediaType,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "*",
                "Cache-Control": "no-cache",
            },
        });
    } catch (err: unknown) {
        const isAbort = err instanceof Error && err.name === "AbortError";
        const message = isAbort
            ? "Stream timeout – the source server did not respond in time"
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