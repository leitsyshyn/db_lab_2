"use server";

import prisma from "@/lib/prisma";
import { AlbumCreateSchema, AlbumUpdateSchema } from "@/lib/schemas";
import { AlbumCreate, AlbumUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createAlbum(data: AlbumCreate) {
  const albumData = AlbumCreateSchema.parse(data);

  await prisma.album.create({ data: albumData });

  revalidatePath("/albums");
}

export async function updateAlbum(id: string, data: AlbumUpdate) {
  const albumData = AlbumUpdateSchema.parse(data);

  await prisma.album.update({
    where: { id },
    data: albumData,
  });

  revalidatePath("/albums");
}

export async function deleteAlbum(id: string) {
  await prisma.album.delete({ where: { id } });

  revalidatePath("/albums");
}
