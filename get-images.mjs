// Downloads every site photo from Unsplash into /images as local .webp files.
// Run once from the repo root:  node get-images.mjs   (Node 18+)
// Photos: Unsplash License (free for commercial use). Big = 1800px hero/banner, sm = 760px cards.
import { mkdir, writeFile } from "node:fs/promises";
const P = {
  hero:"photo-1652707228067-25672fa0b082", uae:"photo-1512453979798-5ea266f8880c", saudi:"photo-1694018359679-49465b4c0d61",
  qatar:"photo-1700901742651-6b353164caf3", turkey:"photo-1623439845420-6eb167001b2a", schengen:"photo-1502602898657-3e91760cbb34",
  uk:"photo-1520986606214-8b456906c813", usa:"photo-1496588152823-86ff7695e68f", canada:"photo-1507992781348-310259076fe0",
  malaysia:"photo-1757476622253-c79874b198ac", thailand:"photo-1736128023093-9a2d76b20cf2", singapore:"photo-1599594026550-97d9565ceda3",
  australia:"photo-1523059623039-a9ed027e7fad", "dubai-escape":"photo-1489493585363-d69421e0edd3", "turkey-highlights":"photo-1680469814298-9a1220de2cf2",
  "classic-europe":"photo-1482690205767-61deebe15ef7", "maldives-honeymoon":"photo-1697898109604-e06e88b15271", "malaysia-singapore":"photo-1562474541-07ed748b1d46",
  "thailand-escape":"photo-1534008897995-27a23e859048", "umrah-package":"photo-1579305796288-c534f6cf17ab", "world-tour":"photo-1488085061387-422e29b40080",
  "umrah-economy":"photo-1693590614566-1d3ea9ef32f7", "umrah-standard":"photo-1656463466195-99920b66542e", "umrah-premium":"photo-1667454496584-9838026037af",
  "schengen-mistakes":"photo-1454496406107-dc34337da8d6", "first-trip-dubai":"photo-1765801122549-2c11dc9cbd78", "best-time-turkey":"photo-1661935635412-fa36cf42ae35",
  "packing-checklist":"photo-1670888664952-efff442ec0d2", about:"photo-1561131668-f63504fc549d", contact:"photo-1536286144513-881bfbd3f292"
};
const get = async (id, w, q, out) => {
  const r = await fetch(`https://images.unsplash.com/${id}?w=${w}&q=${q}&fm=webp&fit=crop&auto=format`);
  if (!r.ok) throw new Error(`${out}: HTTP ${r.status}`);
  await writeFile(out, Buffer.from(await r.arrayBuffer()));
};
await mkdir("images/sm", { recursive: true });
for (const [k, id] of Object.entries(P)) {
  await get(id, 1800, 68, `images/${k}.webp`);
  await get(id, 760, 64, `images/sm/${k}.webp`);
  console.log("✓", k);
}
console.log("Done — all photos saved in /images");
