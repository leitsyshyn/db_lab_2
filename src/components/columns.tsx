"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ZodObject, ZodRawShape, z } from "zod";

import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    label?: string;
  }
}

export function columnsFromSchema<Schema extends ZodObject<ZodRawShape>>(
  schema: Schema,
  overrides: Partial<Record<string, Partial<ColumnDef<z.infer<Schema>>>>> = {}
): ColumnDef<z.infer<Schema>>[] {
  type Row = z.infer<Schema>;
  const shapeKeys = Object.keys(schema.shape) as Array<keyof Row>;
  const overrideKeys = Object.keys(overrides);

  const accessorCols: ColumnDef<Row>[] = shapeKeys.map((field) => ({
    accessorKey: field,
    meta: {
      label: schema.shape[field as string]?.description ?? (field as string),
    },
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={column.getToggleSortingHandler()}>
          {schema.shape[field as string]?.description ?? (field as string)}

          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      );
    },
    ...(overrides[field as string] ?? {}),
  }));

  const extraCols: ColumnDef<Row>[] = overrideKeys
    .filter((key) => !shapeKeys.includes(key as keyof Row))
    .map((key) => overrides[key] as ColumnDef<Row>);

  return [...accessorCols, ...extraCols];
}
