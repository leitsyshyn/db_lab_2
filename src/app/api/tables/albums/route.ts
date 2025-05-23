import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const albums = await prisma.album.findMany();
    console.log("Fetched albums:", albums);
    if (!albums) {
      return Response.json({ error: "No albums found" }, { status: 404 });
    }
    return Response.json(albums);
  } catch {
    return Response.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}
