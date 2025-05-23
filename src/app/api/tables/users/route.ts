import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("Fetched users:", users);
    if (!users) {
      return Response.json({ error: "No users found" }, { status: 404 });
    }
    return Response.json(users);
  } catch {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
