"use client";
import { PlaylistTrackSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import {
  createPlaylistTrack,
  deletePlaylistTrack,
  updatePlaylistTrack,
} from "@/app/tables/junction/playlist_track/actions";
import { fetchPlaylistTracks } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
      title="PlaylistTrack Table"
      item="PlaylistTrack"
      schema={PlaylistTrackSchema}
      queryKey={["playlist_tracks"]}
      fetchFn={fetchPlaylistTracks}
      createFn={createPlaylistTrack}
      updateFn={updatePlaylistTrack}
      deleteFn={deletePlaylistTrack}
    />
  );
}
