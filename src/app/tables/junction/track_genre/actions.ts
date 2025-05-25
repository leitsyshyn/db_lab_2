"use server";

import prisma from "@/lib/prisma";
import { TrackGenreCreateSchema, TrackGenreUpdateSchema } from "@/lib/schemas";
import { TrackGenreCreate, TrackGenreUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createTrackGenre(data: TrackGenreCreate) {
  const createData = TrackGenreCreateSchema.parse(data);
  await prisma.trackGenre.create({ data: createData });
  revalidatePath("/track_genres");
}

export async function updateTrackGenre(id: string, data: TrackGenreUpdate) {
  const updateData = TrackGenreUpdateSchema.parse(data);

  const [trackId, genreId] = id.split("_");
  if (!trackId || !genreId) {
    throw new Error(`Invalid composite-id “${id}”`);
  }

  await prisma.trackGenre.update({
    where: { trackId_genreId: { trackId, genreId } },
    data: updateData,
  });

  revalidatePath("/track_genres");
}

export async function deleteTrackGenre(id: string) {
  const [trackId, genreId] = id.split("_");
  if (!trackId || !genreId) {
    throw new Error(`Invalid composite-id “${id}”`);
  }

  await prisma.trackGenre.delete({
    where: { trackId_genreId: { trackId, genreId } },
  });

  revalidatePath("/track_genres");
}
