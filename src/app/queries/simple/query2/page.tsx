"use client";
import { simpleQuery2ParamsSchema, simpleQuery2Schema } from "@/lib/schemas";
import { fetchSimpleQuery2 } from "@/lib/api/queries/simple";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Simple Query 2"
      schema={simpleQuery2Schema}
      queryKeyBase="simpleQuery2"
      fetchFn={fetchSimpleQuery2}
      paramsSchema={simpleQuery2ParamsSchema}
      initialParams={{
        minDate: new Date("2020-01-01"),
      }}
    />
  );
}
