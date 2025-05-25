import prisma from "@/lib/prisma";
import { simpleQuery4 } from "@/app/generated/prisma/client/sql";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");
    if (!country) {
      return Response.json({ error: "Country is required" }, { status: 400 });
    }

    const users = await prisma.$queryRawTyped(simpleQuery4(country));
    console.log("Fetched users for query:", users);
    if (!users) {
      return Response.json({ error: "No users found" }, { status: 404 });
    }
    return Response.json(users);
  } catch {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
