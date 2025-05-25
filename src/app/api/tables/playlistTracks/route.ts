import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tracks = await prisma.playlistTrack.findMany();
    console.log("Fetched playlist tracks:", tracks);
    if (!tracks) {
      return Response.json(
        { error: "No playlist tracks found" },
        { status: 404 }
      );
    }
    return Response.json(tracks);
  } catch {
    return Response.json(
      { error: "Failed to fetch playlist tracks" },
      { status: 500 }
    );
  }
}
