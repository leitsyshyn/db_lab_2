"use client";
import { simpleQuery4ParamsSchema, simpleQuery4Schema } from "@/lib/schemas";
import { fetchSimpleQuery4 } from "@/lib/api/queries/simple";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 4"
      schema={simpleQuery4Schema}
      queryKeyBase="simpleQuery4"
      fetchFn={fetchSimpleQuery4}
      paramsSchema={simpleQuery4ParamsSchema}
      initialParams={{
        country: "Uganda",
      }}
    />
  );
}
