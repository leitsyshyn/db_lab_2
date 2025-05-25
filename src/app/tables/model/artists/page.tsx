"use client";
import { ArtistSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";
import {
  createArtist,
  updateArtist,
  deleteArtist,
} from "@/app/tables/model/artists/actions";
import { fetchArtists } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
      title="Artists Table"
      item="Artist"
      schema={ArtistSchema}
      queryKey={["artists"]}
      fetchFn={fetchArtists}
      createFn={createArtist}
      updateFn={updateArtist}
      deleteFn={deleteArtist}
    />
  );
}
