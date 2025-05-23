"use server";

import prisma from "@/lib/prisma";
import { GenreCreateSchema, GenreUpdateSchema } from "@/lib/schemas";
import { GenreCreate, GenreUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createGenre(data: GenreCreate) {
  const genreData = GenreCreateSchema.parse(data);

  await prisma.genre.create({ data: genreData });

  revalidatePath("/genres");
}

export async function updateGenre(id: string, data: GenreUpdate) {
  const genreData = GenreUpdateSchema.parse(data);

  await prisma.genre.update({
    where: { id },
    data: genreData,
  });

  revalidatePath("/genres");
}

export async function deleteGenre(id: string) {
  await prisma.genre.delete({ where: { id } });

  revalidatePath("/genres");
}
