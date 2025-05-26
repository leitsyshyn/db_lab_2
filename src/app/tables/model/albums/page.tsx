"use client";
import { AlbumSchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";

import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "@/app/tables/model/albums/actions";
import { fetchAlbums } from "@/lib/api/tables";

export default function Page() {
  return (
    <SchemaTable
      title="Albums Table"
      item="Album"
      schema={AlbumSchema}
      queryKey={["albums"]}
      fetchFn={fetchAlbums}
      createFn={createAlbum}
      updateFn={updateAlbum}
      deleteFn={deleteAlbum}
    />
  );
}
