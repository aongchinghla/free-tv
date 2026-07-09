"use client";

import { useState } from "react";
import { TVChannel } from "@/data/playlist";
import VideoPlayer from "./VideoPlayer";

export default function WatchClient({ match }: { match: TVChannel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const servers = match.servers || (match.url ? [{ name: "Server 1", url: match.url }] : []);
  const activeServer = servers[activeIndex];
  const isTv = match.type === "tv";
  const title = isTv
    ? match.title
    : `${match.teamA?.name || ""} vs ${match.teamB?.name || ""}`;

  return (
    <div>
      <div className="px-3 sm:px-6 lg:px-8 mb-5">
        <p className="mb-1 text-sm text-white/40">{match.competition} · {match.round}</p>
        <h1 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
          {isTv ? (
            title
          ) : (
            <>
              {match.teamA?.name || ""} <span className="text-white/40">vs</span>{" "}
              {match.teamB?.name || ""}
            </>
          )}
        </h1>
      </div>

      <VideoPlayer
        key={activeServer?.url}
        id={match.id}
        src={activeServer?.url}
        poster={match.logo}
        servers={servers}
        activeIndex={activeIndex}
        onSelectServer={setActiveIndex}
        viewers={match.viewers}
      />
    </div>
  );
}
