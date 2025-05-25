"use client";
import { AlbumSchema } from "@/lib/schemas";
import TablePage from "@/components/TablePage";

import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "@/app/tables/model/albums/actions";
import { fetchAlbums } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
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
