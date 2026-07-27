"use client";

import { useEffect, useMemo, useState } from "react";
import { TVChannel } from "@/data/playlist";
import VideoPlayer from "./VideoPlayer";

function GuideIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16" />
      <path d="M3 10h18" />
      <path d="M3 16h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function HomeTvPlayer({ channels }: { channels: TVChannel[] }) {
  const STORAGE_KEY = "freetv:selected-channel";
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [query, setQuery] = useState("");
  const activeChannel = channels[activeChannelIndex];
  const servers = activeChannel ? (activeChannel.servers || (activeChannel.url ? [{ name: "Server 1", url: activeChannel.url }] : [])) : [];
  const activeServer = servers[activeServerIndex];
  const filteredChannels = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return channels;

    return channels.filter((channel) =>
      channel.title.toLowerCase().includes(term)
    );
  }, [channels, query]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as { channelId?: string; serverIndex?: number };
      const channelIndex = channels.findIndex((channel) => channel.id === parsed.channelId);

      if (channelIndex !== -1) {
        setActiveChannelIndex(channelIndex);
        if (typeof parsed.serverIndex === "number" && parsed.serverIndex >= 0) {
          setActiveServerIndex(parsed.serverIndex);
        }
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [channels]);

  useEffect(() => {
    if (typeof window === "undefined" || !activeChannel) return;

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        channelId: activeChannel.id,
        serverIndex: activeServerIndex,
      })
    );
  }, [activeChannel?.id, activeServerIndex]);

  if (!activeChannel || !activeServer) {
    return (
      <p className="grid min-h-[100dvh] place-items-center bg-black px-6 py-10 text-center text-white/50">
        No channels are available right now.
      </p>
    );
  }

  function selectChannel(index: number) {
    setActiveChannelIndex(index);
    setActiveServerIndex(0);
    setIsGuideOpen(false);
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(251,176,32,0.16),transparent_34%),linear-gradient(180deg,rgba(5,7,13,0.1),#030407_82%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-0 py-0 xl:items-start">
        <div
          className="relative w-full overflow-hidden bg-black shadow-[0_30px_120px_rgba(0,0,0,0.72)] ring-1 ring-white/10"
          style={{
            maxWidth: "min(100vw, 1800px, calc(100dvh * 16 / 9))",
          }}
        >
          <VideoPlayer
            id={activeChannel.id}
            src={activeServer.url}
            poster={activeChannel.logo}
            servers={servers}
            activeIndex={activeServerIndex}
            onSelectServer={setActiveServerIndex}
            viewers={activeChannel.viewers}
            channels={channels}
            activeChannelIndex={activeChannelIndex}
            onSelectChannel={selectChannel}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsGuideOpen(true)}
        className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-md border border-floodlight-400/55 bg-black/70 px-4 py-2.5 text-xs font-bold uppercase text-white shadow-[0_0_24px_rgba(251,176,32,0.42),0_18px_42px_rgba(0,0,0,0.45)] backdrop-blur-md transition before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-floodlight-500/25 before:blur-xl before:content-[''] after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-md after:ring-2 after:ring-floodlight-400/45 after:content-[''] hover:border-floodlight-400 hover:bg-white/10 hover:shadow-[0_0_34px_rgba(251,176,32,0.62),0_18px_42px_rgba(0,0,0,0.45)] xl:bottom-auto xl:left-auto xl:right-0 xl:top-1/2 xl:-translate-y-1/2 xl:translate-x-0 xl:flex-col xl:rounded-l-md xl:border-r-0 xl:px-2.5 xl:py-3 xl:before:rounded-l-md xl:after:rounded-l-md"
        aria-label="Open channel guide"
      >
        <GuideIcon />
        <span className="xl:[writing-mode:vertical-rl]">Channels</span>
      </button>

      {isGuideOpen && (
        <button
          type="button"
          aria-label="Close channel guide"
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
          onClick={() => setIsGuideOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[82dvh] flex-col border-t border-white/10 bg-[#07090f]/95 shadow-[0_-28px_90px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-transform duration-300 xl:inset-x-auto xl:bottom-0 xl:right-0 xl:top-0 xl:max-h-none xl:w-[23rem] xl:border-l xl:border-t-0 xl:shadow-[0_0_80px_rgba(0,0,0,0.72)] ${
          isGuideOpen
            ? "translate-y-0 xl:translate-x-0"
            : "translate-y-full xl:translate-x-full xl:translate-y-0"
        }`}
        aria-hidden={!isGuideOpen}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-floodlight-400">
              Live TV
            </p>
            <h2 className="truncate font-display text-2xl leading-none tracking-wide text-white">
              Channels
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsGuideOpen(false)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            aria-label="Close channel guide"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="border-b border-white/10 px-4 py-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search channels"
            className="h-10 w-full rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm font-medium text-white outline-none transition placeholder:text-white/35 focus:border-floodlight-400/70 focus:bg-white/[0.09]"
          />
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-3">
          <div className="grid gap-2">
            {filteredChannels.map((channel) => {
              const index = channels.findIndex((item) => item.id === channel.id);
              const isActive = index === activeChannelIndex;
              const serverCount = channel.servers?.length || (channel.url ? 1 : 0);

              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => selectChannel(index)}
                  className={`group relative flex min-h-14 items-center gap-2.5 overflow-hidden rounded-md border px-2.5 py-2 text-left transition ${
                    isActive
                      ? "border-floodlight-400/75 bg-floodlight-500/14 text-white shadow-[0_0_24px_rgba(251,176,32,0.14)]"
                      : "border-white/10 bg-white/[0.035] text-white/72 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-floodlight-500" />
                  )}
                  <span className="w-7 shrink-0 text-center text-[11px] font-black text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-10 w-12 shrink-0 place-items-center overflow-hidden rounded bg-white p-1.5 shadow-lg shadow-black/20">
                    <img
                      src={channel.logo}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-lg leading-none tracking-wide">
                      {channel.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-semibold text-white/35">
                      {serverCount} {serverCount === 1 ? "server" : "servers"}
                    </span>
                  </span>
                  {isActive && (
                    <span className="shrink-0 rounded bg-floodlight-500 px-2 py-1 text-[10px] sm:text-xs font-black uppercase leading-none text-black">
                      Live
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {filteredChannels.length === 0 && (
            <p className="px-3 py-12 text-center text-sm text-white/45">
              No channels found.
            </p>
          )}
        </div>
      </aside>
    </section>
  );
}
