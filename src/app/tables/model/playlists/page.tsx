"use client";
import { PlaylistSchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";
import { fetchPlaylists } from "@/lib/api/tables";
import {
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/app/tables/model/playlists/actions";

export default function Page() {
  return (
    <SchemaTable
      title="Playlists Table"
      item="Playlist"
      schema={PlaylistSchema}
      queryKey={["playlists"]}
      fetchFn={fetchPlaylists}
      createFn={createPlaylist}
      updateFn={updatePlaylist}
      deleteFn={deletePlaylist}
    />
  );
}
