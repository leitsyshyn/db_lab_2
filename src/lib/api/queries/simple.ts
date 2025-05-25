import {
  SimpleQuery1,
  SimpleQuery2,
  SimpleQuery3,
  SimpleQuery4,
  SimpleQuery5,
} from "@/lib/types";

export async function fetchSimpleQuery1(params: {
  minTrackCount: number;
}): Promise<SimpleQuery1[]> {
  const res = await fetch(
    `/api/queries/simple/query1?minTrackCount=${params.minTrackCount}`
  );
  if (!res.ok) throw new Error("Failed to fetch simple query 1");
  return await res.json();
}

export async function fetchSimpleQuery2(params: {
  minDate: Date;
}): Promise<SimpleQuery2[]> {
  const res = await fetch(
    `/api/queries/simple/query2?minDate=${params.minDate.toISOString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch simple query 2");
  return await res.json();
}

export async function fetchSimpleQuery3(params: {
  minGenreCount: number;
}): Promise<SimpleQuery3[]> {
  const res = await fetch(
    `/api/queries/simple/query3?minGenreCount=${params.minGenreCount}`
  );
  if (!res.ok) throw new Error("Failed to fetch simple query 3");
  return await res.json();
}

export async function fetchSimpleQuery4(params: {
  country: string;
}): Promise<SimpleQuery4[]> {
  const res = await fetch(
    `/api/queries/simple/query4?country=${params.country}`
  );
  if (!res.ok) throw new Error("Failed to fetch simple query 4");
  return await res.json();
}

export async function fetchSimpleQuery5(params: {
  genreName: string;
  minTrackDuration: number;
}): Promise<SimpleQuery5[]> {
  const res = await fetch(
    `/api/queries/simple/query5?genreName=${params.genreName}&minTrackDuration=${params.minTrackDuration}`
  );
  if (!res.ok) throw new Error("Failed to fetch simple query 5");
  return await res.json();
}
