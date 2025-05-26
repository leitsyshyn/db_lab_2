"use server";

import prisma from "@/lib/prisma";
import { CountryCreateSchema, CountryUpdateSchema } from "@/lib/schemas";
import { CountryCreate, CountryUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCountry(data: CountryCreate) {
  const countryData = CountryCreateSchema.parse(data);

  await prisma.country.create({ data: countryData });

  revalidatePath("/countries");
}

export async function updateCountry(id: string, data: CountryUpdate) {
  const countryData = CountryUpdateSchema.parse(data);

  await prisma.country.update({
    where: { id },
    data: countryData,
  });

  revalidatePath("/countries");
}

export async function deleteCountry(id: string) {
  await prisma.country.delete({ where: { id } });

  revalidatePath("/countries");
}
