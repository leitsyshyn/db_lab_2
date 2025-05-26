"use client";
import { ArtistSchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";
import {
  createArtist,
  updateArtist,
  deleteArtist,
} from "@/app/tables/model/artists/actions";
import { fetchArtists } from "@/lib/api/tables";

export default function Page() {
  return (
    <SchemaTable
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
