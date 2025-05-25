"use client";
import {
  setComparisonQuery2ParamsSchema,
  setComparisonQuery2Schema,
} from "@/lib/schemas";
import { fetchSetComparisonQuery2 } from "@/lib/api/queries/setComparison";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Set Comparison Query 2"
      description="Find users who have a playlist which contains all the tracks of an album with name X."
      schema={setComparisonQuery2Schema}
      queryKeyBase={"setComparisonQuery2"}
      initialParams={{
        albumName: "cresco canto ubi vulariter",
      }}
      fetchFn={fetchSetComparisonQuery2}
      paramsSchema={setComparisonQuery2ParamsSchema}
    />
  );
}
