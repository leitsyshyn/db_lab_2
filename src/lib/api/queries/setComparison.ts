import {
  SetComparisonQuery1,
  SetComparisonQuery2,
  SetComparisonQuery3,
} from "@/lib/types";

export async function fetchSetComparisonQuery1(
  username: string
): Promise<SetComparisonQuery1[]> {
  const res = await fetch(
    `/api/queries/setComparison/query1?username=${username}`
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 1");
  return await res.json();
}
export async function fetchSetComparisonQuery2(
  albumName: string
): Promise<SetComparisonQuery2[]> {
  const res = await fetch(
    `/api/queries/setComparison/query2?albumName=${albumName}`
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 2");
  return await res.json();
}
export async function fetchSetComparisonQuery3(
  artistName: string
): Promise<SetComparisonQuery3[]> {
  const res = await fetch(
    `/api/queries/setComparison/query3?artistName=${artistName}`
  );
  if (!res.ok) throw new Error("Failed to fetch set comparison query 3");
  return await res.json();
}
