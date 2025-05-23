import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tracks = await prisma.track.findMany();
    console.log("Fetched tracks:", tracks);
    if (!tracks) {
      return Response.json({ error: "No tracks found" }, { status: 404 });
    }
    return Response.json(tracks);
  } catch {
    return Response.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
