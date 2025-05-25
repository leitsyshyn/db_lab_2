"use client";
import { simpleQuery5ParamsSchema, simpleQuery5Schema } from "@/lib/schemas";
import { fetchSimpleQuery5 } from "@/lib/api/queries/simple";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 5"
      schema={simpleQuery5Schema}
      queryKeyBase="simpleQuery5"
      fetchFn={fetchSimpleQuery5}
      paramsSchema={simpleQuery5ParamsSchema}
      initialParams={{
        genreName: "Pop",
        minTrackDuration: 180,
      }}
    />
  );
}
