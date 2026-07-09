export function formatKickoff(isoString) {
  const date = new Date(isoString);
  const day = date.toLocaleDateString("en-GB", { day: "numeric" });
  const month = date
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase();
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toUpperCase();
  return `${day} ${month} · ${time}`;
}
