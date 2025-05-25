import prisma from "@/lib/prisma";
import { setComparisonQuery1 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return Response.json({ error: "username is required" }, { status: 400 });
    }
    const playlists = await prisma.$queryRawTyped(
      setComparisonQuery1(username)
    );
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
