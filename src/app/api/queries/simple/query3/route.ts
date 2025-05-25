import prisma from "@/lib/prisma";
import { simpleQuery3 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const minGenreCount = Number(searchParams.get("minGenreCount"));
    if (!minGenreCount) {
      return Response.json(
        { error: "Min genre count is required" },
        { status: 400 }
      );
    }
    const playlists = await prisma.$queryRawTyped(simpleQuery3(minGenreCount));
    console.log("Fetched playlists for query:", playlists);
    if (!playlists) {
      return Response.json({ error: "No playlists found" }, { status: 404 });
    }
    return Response.json(playlists);
  } catch {
    return Response.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}
