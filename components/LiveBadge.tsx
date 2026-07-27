export default function LiveBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-red-600 font-display font-bold tracking-wider text-white shadow-sm shadow-red-600/40 select-none leading-none ${
        isSmall ? "h-[22px] px-2 text-[11px] sm:h-6 sm:px-2.5 sm:text-xs" : "px-3.5 py-1.5 text-sm"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      LIVE
    </span>
  );
}



