export default function LiveBadge({ size = "sm" }) {
  const isSmall = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-signal-500 font-display tracking-wider text-white shadow-lg shadow-signal-500/30 ${isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
        }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      LIVE
    </span>
  );
}
