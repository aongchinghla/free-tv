"use client";

export default function ServerSelector({ servers, activeIndex, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {servers.map((server, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={server.name}
            onClick={() => onSelect(index)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-display text-sm tracking-wide transition ${
              isActive
                ? "bg-floodlight-500 text-void-950"
                : "border border-white/10 bg-void-800 text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            {server.name}
            {server.quality && (
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive
                    ? "bg-void-950/20 text-void-950"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {server.quality}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
