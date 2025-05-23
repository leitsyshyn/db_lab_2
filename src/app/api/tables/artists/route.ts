import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const artists = await prisma.artist.findMany();
    console.log("Fetched artists:", artists);
    if (!artists) {
      return Response.json({ error: "No artists found" }, { status: 404 });
    }
    return Response.json(artists);
  } catch {
    return Response.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
