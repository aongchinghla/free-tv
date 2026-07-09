import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const target = req.nextUrl.searchParams.get("url");

    if (!target) {
        return new Response("Missing url", { status: 400 });
    }

    try {
        const response = await fetch(target, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        const contentType =
            response.headers.get("content-type") || "";

        if (
            target.endsWith(".m3u8") ||
            contentType.includes("mpegurl")
        ) {
            let text = await response.text();
            const base = new URL(response.url);

            text = text.replace(/^([^#].+)$/gm, (line) => {
                const absolute = new URL(line, base).href;
                if (absolute.includes('/api/proxy?url=')) return absolute;
                return `/api/proxy?url=${encodeURIComponent(absolute)}`;
            });

            return new Response(text, {
                headers: {
                    "Content-Type":
                        "application/vnd.apple.mpegurl",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        return new Response(response.body, {
            headers: {
                "Content-Type":
                    contentType || "video/mp2t",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (err) {
        return new Response("Proxy Error", { status: 500 });
    }
}