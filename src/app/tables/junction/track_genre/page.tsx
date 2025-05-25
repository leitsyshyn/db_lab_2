"use client";
import { TrackGenreSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";

import { fetchTrackGenres } from "@/lib/api/tables";
import {
  createTrackGenre,
  updateTrackGenre,
  deleteTrackGenre,
} from "@/app/tables/junction/track_genre/actions";

export default function Page() {
  return (
    <TablePage
      title="TrackGenre Table"
      item="TrackGenre"
      schema={TrackGenreSchema}
      queryKey={["track_genres"]}
      fetchFn={fetchTrackGenres}
      createFn={createTrackGenre}
      updateFn={updateTrackGenre}
      deleteFn={deleteTrackGenre}
    />
  );
}
