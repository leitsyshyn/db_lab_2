"use client";
import { CountrySchema } from "@/lib/schemas";
import SchemaTable from "@/components/SchemaTable";
import { fetchCountries } from "@/lib/api/tables";
import {
  createCountry,
  updateCountry,
  deleteCountry,
} from "@/app/tables/model/countries/actions";

export default function Page() {
  return (
    <SchemaTable
      title="Countries Table"
      item="Country"
      schema={CountrySchema}
      queryKey={["countries"]}
      fetchFn={fetchCountries}
      createFn={createCountry}
      updateFn={updateCountry}
      deleteFn={deleteCountry}
    />
  );
}
