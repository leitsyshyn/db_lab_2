import prisma from "@/lib/prisma";
import { getArtistsWithAlbumsAfterDate } from "@/app/generated/prisma/client/sql";

export async function GET() {
  try {
    const artists = await prisma.$queryRawTyped(
      getArtistsWithAlbumsAfterDate(new Date("2023-01-01"))
    );

    // const artists = await prisma.artist.findMany({
    //   where: {
    //     albums: {
    //       some: {
    //         createdAt: {
    //           gt: new Date("2023-01-01"),
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     albums: {
    //       where: {
    //         createdAt: {
    //           gt: new Date("2023-01-01"),
    //         },
    //       },
    //       orderBy: {
    //         createdAt: "asc",
    //       },
    //     },
    //   },
    // });
    console.log("Fetched artists for query:", artists);
    if (!artists) {
      return Response.json({ error: "No artists found" }, { status: 404 });
    }
    return Response.json(artists);
  } catch {
    return Response.json({ error: "Failed to fetch artists" }, { status: 500 });
  }
}
