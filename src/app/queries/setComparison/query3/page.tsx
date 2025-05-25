"use client";
import TablePage from "@/components/TablePage";
import { setComparisonQuery3Schema } from "@/lib/schemas";
import { fetchSetComparisonQuery3 } from "@/lib/api/queries/setComparison";

export default function Page() {
  return (
    <TablePage
      title="Set Comparison Query 3"
      schema={setComparisonQuery3Schema}
      queryKey={["setComparisonQuery3"]}
      fetchFn={() => fetchSetComparisonQuery3("Rose Bergstrom")}
    />
  );
}
