import { setComparisonQuery2 } from "@/app/generated/prisma/client/sql";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const albumName = searchParams.get("albumName");
    if (!albumName) {
      return Response.json(
        { error: "album name is required" },
        { status: 400 }
      );
    }
    const users = await prisma.$queryRawTyped(setComparisonQuery2(albumName));
    console.log("Fetched users for query:", users);
    if (!users) {
      return Response.json({ error: "No users found" }, { status: 404 });
    }
    return Response.json(users);
  } catch {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
