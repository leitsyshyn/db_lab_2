"use server";

import prisma from "@/lib/prisma";
import { TrackCreateSchema, TrackUpdateSchema } from "@/lib/schemas";
import { TrackCreate, TrackUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createTrack(data: TrackCreate) {
  const trackData = TrackCreateSchema.parse(data);

  await prisma.track.create({ data: trackData });

  revalidatePath("/tracks");
}

export async function updateTrack(id: string, data: TrackUpdate) {
  const trackData = TrackUpdateSchema.parse(data);

  await prisma.track.update({
    where: { id },
    data: trackData,
  });

  revalidatePath("/tracks");
}

export async function deleteTrack(id: string) {
  await prisma.track.delete({ where: { id } });

  revalidatePath("/tracks");
}
