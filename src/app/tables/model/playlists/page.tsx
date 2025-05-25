"use client";
import { PlaylistSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import { fetchPlaylists } from "@/lib/api/tables";
import {
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/app/tables/model/playlists/actions";

export default function Page() {
  return (
    <TablePage
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
