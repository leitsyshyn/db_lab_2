"use client";
import { GenreSchema } from "@/lib/schemas";
import {
  createGenre,
  deleteGenre,
  updateGenre,
} from "@/app/tables/genres/actions";
import TablePage from "@/components/TablePage";
import { fetchGenres } from "@/lib/api/tables";

export default function Page() {
  return (
    <TablePage
      title="Genre"
      schema={GenreSchema}
      queryKey={["genres"]}
      fetchFn={fetchGenres}
      createFn={createGenre}
      updateFn={updateGenre}
      deleteFn={deleteGenre}
    />
  );
}
