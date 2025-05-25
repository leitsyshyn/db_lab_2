"use client";
import {
  setComparisonQuery1ParamsSchema,
  setComparisonQuery1Schema,
} from "@/lib/schemas";
import { fetchSetComparisonQuery1 } from "@/lib/api/queries/setComparison";
import { QueryPage } from "@/components/QueryPage";

export default function Page() {
  return (
    <QueryPage
      title="Set Comparison Query 1"
      description="Find playlists that contain tracks of the same genres as the tracks in playlists of a user with name X."
      schema={setComparisonQuery1Schema}
      paramsSchema={setComparisonQuery1ParamsSchema}
      queryKeyBase={"setComparisonQuery1"}
      initialParams={{
        username: "Fleta45",
      }}
      fetchFn={fetchSetComparisonQuery1}
    />
  );
}
