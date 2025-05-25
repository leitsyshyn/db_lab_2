import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tracks = await prisma.trackGenre.findMany();
    console.log("Fetched track genres:", tracks);
    if (!tracks) {
      return Response.json({ error: "No track genres found" }, { status: 404 });
    }
    return Response.json(tracks);
  } catch {
    return Response.json(
      { error: "Failed to fetch track genres" },
      { status: 500 }
    );
  }
}
