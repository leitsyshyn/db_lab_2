import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany();
    console.log("Fetched genres:", genres);
    if (!genres) {
      return Response.json({ error: "No genres found" }, { status: 404 });
    }
    return Response.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return Response.json(
      { error: "Failed to fetch genres" + error },
      { status: 500 }
    );
  }
}
