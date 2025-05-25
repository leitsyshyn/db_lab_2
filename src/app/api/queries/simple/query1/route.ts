import prisma from "@/lib/prisma";
import { simpleQuery1 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const minTrackCount = Number(searchParams.get("minTrackCount"));
    if (!minTrackCount) {
      return Response.json(
        { error: "min track count is required" },
        { status: 400 }
      );
    }
    const albums = await prisma.$queryRawTyped(simpleQuery1(minTrackCount));
    console.log("Fetched albums for query:", albums);
    if (!albums) {
      return Response.json({ error: "No albums found" }, { status: 404 });
    }
    return Response.json(albums);
  } catch {
    return Response.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}
