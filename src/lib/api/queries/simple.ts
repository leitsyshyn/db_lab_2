import { Artist } from "@/lib/types";

export async function fetchArtistsWithAlbumsAfterDate(
  date: Date
): Promise<Artist[]> {
  const res = await fetch(
    `/api/queries/simple/artists?date=${date.toISOString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch artists");
  return await res.json();
}
