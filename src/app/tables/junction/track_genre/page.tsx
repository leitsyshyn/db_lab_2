"use client";
import { TrackGenreSchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";

import { fetchTrackGenres } from "@/lib/api/tables";
import {
  createTrackGenre,
  updateTrackGenre,
  deleteTrackGenre,
} from "@/app/tables/junction/track_genre/actions";

export default function Page() {
  return (
    <SchemaTable
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
