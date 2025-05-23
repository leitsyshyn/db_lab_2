import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const playlists = await prisma.playlist.findMany();
    console.log("Fetched playlists:", playlists);
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
