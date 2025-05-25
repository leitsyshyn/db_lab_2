"use server";

import prisma from "@/lib/prisma";
import { ArtistCreateSchema, ArtistUpdateSchema } from "@/lib/schemas";
import { ArtistCreate, ArtistUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createArtist(data: ArtistCreate) {
  const artistData = ArtistCreateSchema.parse(data);

  await prisma.artist.create({ data: artistData });

  revalidatePath("/artists");
}

export async function updateArtist(id: string, data: ArtistUpdate) {
  const artistData = ArtistUpdateSchema.parse(data);

  await prisma.artist.update({
    where: { id },
    data: artistData,
  });

  revalidatePath("/artists");
}

export async function deleteArtist(id: string) {
  await prisma.artist.delete({ where: { id } });

  revalidatePath("/artists");
}
