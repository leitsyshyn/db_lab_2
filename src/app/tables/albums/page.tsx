"use client";
import { AlbumSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";

import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "@/app/tables/albums/actions";
import { fetchAlbums } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
      title="Album"
      schema={AlbumSchema}
      queryKey={["albums"]}
      fetchFn={fetchAlbums}
      createFn={createAlbum}
      updateFn={updateAlbum}
      deleteFn={deleteAlbum}
    />
  );
}
