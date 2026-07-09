# FreeTV by AC

Live sports streaming site built with Next.js (App Router) + Tailwind CSS + hls.js.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add / edit matches

Everything is driven by one file: **`data/tvlink.ts`**


- Add a new object to the array for a new match — a new card + watch page appear automatically.
- `servers` can hold as many m3u8 links as you want; they show up as tabs on the watch page so viewers can switch if one server is down.
- Set `status` to `"upcoming"` for matches that haven't started; switch it to `"live"` when the stream goes up.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables needed.
4. Deploy — every future edit to `data/tvlink.ts` + git push updates the live site.

## Notes

- Streams play via `hls.js` in the browser (Safari uses native HLS support).
- `data/tvlink.ts` currently has placeholder `example.com` m3u8 URLs — replace these with your real stream links before deploying.
- Team badges use plain color + initials (no external images), so there's nothing to upload or license — just change the `color` hex per team.
