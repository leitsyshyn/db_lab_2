"use client";
import { TrackSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import {
  createTrack,
  updateTrack,
  deleteTrack,
} from "@/app/tables/model/tracks/actions";
import { fetchTracks } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
      title="Tracks Table"
      item="Track"
      schema={TrackSchema}
      queryKey={["tracks"]}
      fetchFn={fetchTracks}
      createFn={createTrack}
      updateFn={updateTrack}
      deleteFn={deleteTrack}
    />
  );
}
