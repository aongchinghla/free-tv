import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl text-floodlight-500">404</p>
      <h1 className="mt-2 font-display text-2xl tracking-wide text-white">
        Match not found
      </h1>
      <p className="mt-2 text-white/50">
        The link may be wrong, or this match has not been added yet.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-floodlight-500 px-5 py-2 font-display tracking-wide text-void-950 transition hover:bg-floodlight-400"
      >
        Back Home
      </Link>
    </div>
  );
}
