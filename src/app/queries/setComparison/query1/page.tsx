"use client";
import TablePage from "@/components/TablePage";
import { setComparisonQuery1Schema } from "@/lib/schemas";
import { fetchSetComparisonQuery1 } from "@/lib/api/queries/setComparison";

export default function Page() {
  return (
    <TablePage
      title="Set Comparison Query 1"
      schema={setComparisonQuery1Schema}
      queryKey={["setComparisonQuery1"]}
      fetchFn={() => fetchSetComparisonQuery1("Ruthie7")}
    />
  );
}
