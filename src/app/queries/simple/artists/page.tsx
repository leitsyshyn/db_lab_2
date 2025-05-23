"use client";
import { ArtistSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import {
  createArtist,
  updateArtist,
  deleteArtist,
} from "@/app/tables/artists/actions";
import { fetchArtistsWithAlbumsAfterDate } from "@/lib/api/queries/simple";

export default function Page() {
  return (
    <TablePage
      title="Artist"
      schema={ArtistSchema}
      queryKey={["artists"]}
      fetchFn={() => fetchArtistsWithAlbumsAfterDate(new Date("2020-01-01"))}
      createFn={createArtist}
      updateFn={updateArtist}
      deleteFn={deleteArtist}
    />
  );
}
