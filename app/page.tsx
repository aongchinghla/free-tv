import matches from "@/data/playlist";
import HomeTvPlayer from "@/components/HomeTvPlayer";
import AnnouncementBar from "@/components/announcementbar";

export default function HomePage() {
  const channels = matches.filter((match) => match.type === "tv");

  return (
    <>
      <AnnouncementBar />
      <HomeTvPlayer channels={channels} />
    </>
  );
}
