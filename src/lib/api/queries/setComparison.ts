import {
  SetComparisonQuery1,
  SetComparisonQuery2,
  SetComparisonQuery3,
} from "@/lib/types";

export async function fetchSetComparisonQuery1(params: {
  username: string;
}): Promise<SetComparisonQuery1[]> {
  const res = await fetch(
    `/api/queries/setComparison/query1?username=${params.username}`
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 1");
  return await res.json();
}
export async function fetchSetComparisonQuery2(params: {
  albumName: string;
}): Promise<SetComparisonQuery2[]> {
  const res = await fetch(
    `/api/queries/setComparison/query2?albumName=${params.albumName}`
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 2");
  return await res.json();
}
export async function fetchSetComparisonQuery3(params: {
  minDate: Date;
}): Promise<SetComparisonQuery3[]> {
  const res = await fetch(
    `/api/queries/setComparison/query3?minDate=${params.minDate.toISOString()}` // Assuming the API expects a date string
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 3");
  return await res.json();
}
