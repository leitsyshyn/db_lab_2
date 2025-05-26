import prisma from "@/lib/prisma";
import { simpleQuery4 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get("countryId");
    if (!countryId) {
      return Response.json({ error: "Country is required" }, { status: 400 });
    }

    const users = await prisma.$queryRawTyped(simpleQuery4(countryId));
    console.log("Fetched users for query:", users);
    if (!users) {
      return Response.json({ error: "No users found" }, { status: 404 });
    }
    return Response.json(users);
  } catch (e) {
    console.error("Error fetching users:", e);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
