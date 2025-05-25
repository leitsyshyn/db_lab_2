"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import { ZodObject, ZodRawShape, z } from "zod";

export function columnsFromSchema<Schema extends ZodObject<ZodRawShape>>(
  schema: Schema,
  overrides: Partial<Record<string, Partial<ColumnDef<z.infer<Schema>>>>> = {}
): ColumnDef<z.infer<Schema>>[] {
  type Row = z.infer<Schema>;
  const shapeKeys = Object.keys(schema.shape) as Array<keyof Row>;
  const overrideKeys = Object.keys(overrides);

  const accessorCols: ColumnDef<Row>[] = shapeKeys.map((field) => ({
    accessorKey: field,
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={column.getToggleSortingHandler()}>
          {schema.shape[field as string]?.description ?? (field as string)}

          {column.getIsSorted() === "asc" ? (
            <MoveUp />
          ) : column.getIsSorted() === "desc" ? (
            <MoveDown />
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
