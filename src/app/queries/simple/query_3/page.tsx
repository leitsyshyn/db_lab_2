"use client";
import { simpleQuery3ParamsSchema, simpleQuery3Schema } from "@/lib/schemas";
import { fetchSimpleQuery3 } from "@/lib/api/queries/simple";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 3"
      description="Find playlists which have tracks of at least X genres."
      schema={simpleQuery3Schema}
      queryKeyBase="simpleQuery3"
      fetchFn={fetchSimpleQuery3}
      paramsSchema={simpleQuery3ParamsSchema}
      initialParams={{
        minGenreCount: 2,
      }}
    />
  );
}
