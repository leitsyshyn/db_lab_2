"use server";

import prisma from "@/lib/prisma";
import { PlaylistCreateSchema, PlaylistUpdateSchema } from "@/lib/schemas";
import { PlaylistCreate, PlaylistUpdate } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createPlaylist(data: PlaylistCreate) {
  const playlistData = PlaylistCreateSchema.parse(data);

  await prisma.playlist.create({ data: playlistData });

  revalidatePath("/playlists");
}

export async function updatePlaylist(id: string, data: PlaylistUpdate) {
  const playlistData = PlaylistUpdateSchema.parse(data);

  await prisma.playlist.update({
    where: { id },
    data: playlistData,
  });

  revalidatePath("/playlists");
}

export async function deletePlaylist(id: string) {
  await prisma.playlist.delete({ where: { id } });

  revalidatePath("/playlists");
}
