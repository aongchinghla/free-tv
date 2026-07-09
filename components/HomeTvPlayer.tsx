"use client";

import { useState, useEffect, useRef } from "react";
import { TVChannel } from "@/data/playlist";
import VideoPlayer from "./VideoPlayer";

export default function HomeTvPlayer({ channels }: { channels: TVChannel[] }) {
  const STORAGE_KEY = "freetv:selected-channel";
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const activeChannel = channels[activeChannelIndex];
  const servers = activeChannel ? (activeChannel.servers || (activeChannel.url ? [{ name: "Server 1", url: activeChannel.url }] : [])) : [];
  const activeServer = servers[activeServerIndex];
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (!activeChannel || !activeServer) {
    return (
      <p className="rounded-xl border border-white/10 bg-void-800 px-6 py-10 text-center text-white/50">
        No channels are available right now.
      </p>
    );
  }

  function selectChannel(index: number) {
    setActiveChannelIndex(index);
    setActiveServerIndex(0);
  }

  return (
    <div
      className="mx-auto w-full space-y-4 transition-all duration-300"
      style={{ maxWidth: "min(100%, 1600px, calc((100dvh - 100px) * 16 / 9))" }}
    >

      <div className="w-full overflow-hidden">
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

      <div
        ref={scrollRef}
        className="flex shrink-0 gap-3 overflow-x-auto pb-2 custom-scrollbar"
      >
        {channels.map((channel, index) => {
          const isActive = index === activeChannelIndex;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => selectChannel(index)}
              className={`flex w-36 shrink-0 items-center gap-2 rounded-lg border p-2 text-left transition ${isActive
                  ? "border-floodlight-500 bg-floodlight-500/15 text-white"
                  : "border-white/10 bg-void-800 text-white/60 hover:border-white/25 hover:text-white"
                }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded bg-white p-0.5">
                <img
                  src={channel.logo}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <span className="truncate font-display text-xs font-medium tracking-wide">
                {channel.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}