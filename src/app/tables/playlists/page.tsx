"use client";
import { PlaylistSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import { fetchPlaylists } from "@/lib/api/tables";
import {
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/app/tables/playlists/actions";

export default function Page() {
  return (
    <TablePage
      title="Playlist"
      schema={PlaylistSchema}
      queryKey={["playlists"]}
      fetchFn={fetchPlaylists}
      createFn={createPlaylist}
      updateFn={updatePlaylist}
      deleteFn={deletePlaylist}
    />
  );
}
