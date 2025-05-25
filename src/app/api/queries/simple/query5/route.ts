import prisma from "@/lib/prisma";
import { simpleQuery5 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genreName = searchParams.get("genreName");
    const minTrackDuration = Number(searchParams.get("minTrackDuration"));
    if (!genreName || !minTrackDuration) {
      return Response.json(
        { error: "Both genre name and min track duration are required" },
        { status: 400 }
      );
    }
    const tracks = await prisma.$queryRawTyped(
      simpleQuery5(genreName, minTrackDuration)
    );
    console.log("Fetched tracks for query:", tracks);
    if (!tracks) {
      return Response.json({ error: "No tracks found" }, { status: 404 });
    }
    return Response.json(tracks);
  } catch {
    return Response.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
