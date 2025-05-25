"use client";
import {
  setComparisonQuery3ParamsSchema,
  setComparisonQuery3Schema,
} from "@/lib/schemas";
import { fetchSetComparisonQuery3 } from "@/lib/api/queries/setComparison";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Set Comparison Query 3"
      description="Find pairs of names of artists, whose tracks are included in playlists of the same users created after X"
      schema={setComparisonQuery3Schema}
      paramsSchema={setComparisonQuery3ParamsSchema}
      queryKeyBase={"setComparisonQuery3"}
      fetchFn={fetchSetComparisonQuery3}
      initialParams={{
        minDate: new Date("1970-01-01"),
      }}
    />
  );
}
