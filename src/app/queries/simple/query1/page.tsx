"use client";
import { simpleQuery1ParamsSchema, simpleQuery1Schema } from "@/lib/schemas";
import { fetchSimpleQuery1 } from "@/lib/api/queries/simple";

import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 1"
      schema={simpleQuery1Schema}
      queryKeyBase="simpleQuery1"
      fetchFn={fetchSimpleQuery1}
      paramsSchema={simpleQuery1ParamsSchema}
      initialParams={{
        minTrackCount: 5,
      }}
    />
  );
}
