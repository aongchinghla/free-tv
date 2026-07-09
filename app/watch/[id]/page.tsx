import Link from "next/link";
import { notFound } from "next/navigation";
import matches from "@/data/playlist";
import WatchClient from "@/components/WatchClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return matches.map((match) => ({ id: match.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  if (!match) return { title: "Match not found - FreeTV by AC" };
  if (match.type === "tv") {
    return {
      title: `${match.title} - FreeTV by AC`,
    };
  }
  return {
    title: `${match.teamA?.name || ""} vs ${match.teamB?.name || ""} - FreeTV by AC`,
  };
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  if (!match) notFound();

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-floodlight-400"
      >
        Back to all matches
      </Link>

      {/* Responsive wrapper to prevent vertical overflow and fit laptops */}
      <div
        className="mx-auto w-full px-0 transition-all duration-300"
        style={{
          maxWidth: "min(100%, 1440px, calc((100vh - 100px) * 16 / 9))",
        }}
      >
        <WatchClient match={match} />
      </div>
    </div>
  );
}
