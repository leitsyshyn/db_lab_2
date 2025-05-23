"use client";

import { DataTable } from "@/components/DataTable";
import { columnsFromSchema } from "@/components/columnsFromSchema";
import { DialogFromSchema } from "@/components/DialogFromSchema";
import { DeleteButton } from "@/components/DeleteButton";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { z, ZodObject, ZodRawShape } from "zod";
import React from "react";
import { DefaultValues } from "react-hook-form";

export interface CrudTableProps<
  Schema extends ZodObject<ZodRawShape>,
  CreateSchema extends ZodObject<ZodRawShape>,
  UpdateSchema extends ZodObject<ZodRawShape>
> {
  title: string;
  queryKey: QueryKey;
  fetchFn: () => Promise<z.infer<Schema>[]>;
  schema: Schema;
  createSchema?: CreateSchema;
  createFn: (values: Omit<z.infer<CreateSchema>, "id">) => Promise<void>;
  updateSchema?: UpdateSchema;
  updateFn: (id: string, values: z.infer<UpdateSchema>) => Promise<void>;
  deleteFn: (id: string) => Promise<void>;
}
export function TablePage<
  Schema extends ZodObject<ZodRawShape>,
  CreateSchema extends ZodObject<ZodRawShape> = ZodObject<Schema["shape"]>,
  UpdateSchema extends ZodObject<ZodRawShape> = ZodObject<Schema["shape"]>
>(props: CrudTableProps<Schema, CreateSchema, UpdateSchema>) {
  const {
    title,
    queryKey,
    fetchFn,
    schema,
    createSchema: overriddenCreateSchema,
    updateSchema: overriddenUpdateSchema,
    createFn,
    updateFn,
    deleteFn,
  } = props;

  const createSchema = (overriddenCreateSchema ??
    schema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })) as CreateSchema;

  const updateSchema = (overriddenUpdateSchema ??
    schema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .partial()) as UpdateSchema;

  type T = z.infer<Schema>;
  type CreateT = z.infer<CreateSchema>;
  type UpdateT = z.infer<UpdateSchema>;
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<T[], Error>({
    queryKey,
    queryFn: fetchFn,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const overrides = {
    edit: {
      id: "edit",
      cell: ({ row }: { row: { original: T } }) => (
        <DialogFromSchema
          title={`Edit ${title}`}
          schema={updateSchema}
          defaultValues={row.original as DefaultValues<UpdateT>}
          queryKey={queryKey}
          submitFn={async (values: UpdateT) => {
            await updateFn(row.original.id, values);
            invalidate();
          }}
        />
      ),
    },
    delete: {
      id: "delete",
      cell: ({ row }: { row: { original: T } }) => (
        <DeleteButton
          title={title}
          id={row.original.id}
          queryKey={queryKey}
          deleteFn={async (id: string) => {
            await deleteFn(id);
            invalidate();
          }}
        />
      ),
    },
  };

  const cols = columnsFromSchema(schema, overrides);

  return (
    <div>
      <DialogFromSchema
        title={`Create ${title}`}
        schema={createSchema}
        defaultValues={{} as DefaultValues<CreateT>}
        queryKey={queryKey}
        submitFn={async (values: CreateT) => {
          await createFn(values);
          invalidate();
        }}
      />

      {isLoading && <div>Loading…</div>}
      {isError && <div>Error: {error!.message}</div>}
      {data && <DataTable columns={cols} data={data} />}
    </div>
  );
}

export default TablePage;
