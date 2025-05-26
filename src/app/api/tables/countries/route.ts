import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const countries = await prisma.country.findMany();
    console.log("Fetched countries:", countries);
    if (!countries) {
      return Response.json({ error: "No countries found" }, { status: 404 });
    }
    return Response.json(countries);
  } catch {
    return Response.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
