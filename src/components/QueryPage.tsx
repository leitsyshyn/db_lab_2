"use client";

import { useState } from "react";
import { QueryKey } from "@tanstack/react-query";
import { DefaultValues } from "react-hook-form";
import TablePage from "@/components/TablePage";
import { QueryParamsForm } from "@/components/QueryParamsForm";
import { z, ZodObject, ZodRawShape } from "zod";

interface QueryPageProps<
  ParamsSchema extends ZodObject<ZodRawShape>,
  Schema extends ZodObject<ZodRawShape>
> {
  title: string;
  queryKeyBase: string;
  fetchFn: (params: z.infer<ParamsSchema>) => Promise<z.infer<Schema>[]>;
  paramsSchema: ParamsSchema;
  schema: Schema;
  initialParams: z.infer<ParamsSchema>;
}

export function QueryPage<
  ParamsSchema extends ZodObject<ZodRawShape>,
  DataSchema extends ZodObject<ZodRawShape>
>({
  title,
  queryKeyBase,
  fetchFn,
  paramsSchema,
  schema,
  initialParams,
}: QueryPageProps<ParamsSchema, DataSchema>) {
  const [params, setParams] = useState<z.infer<ParamsSchema>>(initialParams);
  const queryKey: QueryKey = [queryKeyBase, params];

  return (
    <>
      <QueryParamsForm
        schema={paramsSchema}
        defaultValues={params as DefaultValues<z.infer<ParamsSchema>>}
        submitFn={setParams}
        queryKey={queryKey}
      />

      <TablePage
        title={title}
        schema={schema}
        queryKey={queryKey}
        fetchFn={() => fetchFn(params)}
      />
    </>
  );
}
