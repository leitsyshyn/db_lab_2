"use client";
import { simpleQuery4ParamsSchema, simpleQuery4Schema } from "@/lib/schemas";
import { fetchSimpleQuery4 } from "@/lib/api/queries/simple";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 4"
      description="Find users, which have playlists which have tracks from albums by artists from X country."
      schema={simpleQuery4Schema}
      queryKeyBase="simpleQuery4"
      fetchFn={fetchSimpleQuery4}
      paramsSchema={simpleQuery4ParamsSchema}
      initialParams={{
        countryId: "b402882d-a105-4124-8580-532f77b1d682",
      }}
    />
  );
}
