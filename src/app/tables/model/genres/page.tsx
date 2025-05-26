"use client";
import { GenreSchema } from "@/lib/schemas";
import {
  createGenre,
  deleteGenre,
  updateGenre,
} from "@/app/tables/model/genres/actions";
import SchemaTable from "@/components/SchemaTable";
import { fetchGenres } from "@/lib/api/tables";

export default function Page() {
  return (
    <SchemaTable
      title="Genres Table"
      item="Genre"
      schema={GenreSchema}
      queryKey={["genres"]}
      fetchFn={fetchGenres}
      createFn={createGenre}
      updateFn={updateGenre}
      deleteFn={deleteGenre}
    />
  );
}
