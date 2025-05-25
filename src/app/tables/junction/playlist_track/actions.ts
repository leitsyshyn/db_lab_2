"use server";
import prisma from "@/lib/prisma";
import {
  PlaylistTrackCreateSchema,
  PlaylistTrackUpdateSchema,
} from "@/lib/schemas";
import { PlaylistTrackCreate, PlaylistTrackUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createPlaylistTrack(data: PlaylistTrackCreate) {
  const createData = PlaylistTrackCreateSchema.parse(data);
  await prisma.playlistTrack.create({ data: createData });
  revalidatePath("/playlist_tracks");
}

export async function updatePlaylistTrack(
  id: string,
  data: PlaylistTrackUpdate
) {
  const updateData = PlaylistTrackUpdateSchema.parse(data);

  const [playlistId, trackId] = id.split("_");
  if (!playlistId || !trackId) {
    throw new Error(`Invalid composite-id “${id}”`);
  }

  await prisma.playlistTrack.update({
    where: { playlistId_trackId: { playlistId, trackId } },
    data: updateData,
  });

  revalidatePath("/playlist_tracks");
}

export async function deletePlaylistTrack(id: string) {
  const [playlistId, trackId] = id.split("_");
  if (!playlistId || !trackId) {
    throw new Error(`Invalid composite-id “${id}”`);
  }

  await prisma.playlistTrack.delete({
    where: { playlistId_trackId: { playlistId, trackId } },
  });

  revalidatePath("/playlist_tracks");
}
