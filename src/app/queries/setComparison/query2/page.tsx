"use client";
import TablePage from "@/components/TablePage";
import { setComparisonQuery2Schema } from "@/lib/schemas";
import { fetchSetComparisonQuery2 } from "@/lib/api/queries/setComparison";

export default function Page() {
  return (
    <TablePage
      title="Set Comparison Query 2"
      schema={setComparisonQuery2Schema}
      queryKey={["setComparisonQuery2"]}
      fetchFn={() => fetchSetComparisonQuery2("cresco canto ubi vulariter")}
    />
  );
}
