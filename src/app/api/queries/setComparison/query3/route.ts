import prisma from "@/lib/prisma";
import { setComparisonQuery3 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistName = searchParams.get("artistName");

    if (!artistName) {
      return Response.json(
        { error: "artist name is required" },
        { status: 400 }
      );
    }

    const artists = await prisma.$queryRawTyped(
      setComparisonQuery3(artistName)
    );
    console.log("Fetched artists for query:", artists);
    if (!artists) {
      return Response.json({ error: "No artists found" }, { status: 404 });
    }
    return Response.json(artists);
  } catch {
    return Response.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
