"use client";

import { useState } from "react";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { DefaultValues } from "react-hook-form";
import SchemaTable from "@/components/SchemaTable";
import { z, ZodObject, ZodRawShape } from "zod";
import { SchemaForm } from "@/components/SchemaForm";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface QueryPageProps<
  ParamsSchema extends ZodObject<ZodRawShape>,
  Schema extends ZodObject<ZodRawShape>
> {
  title: string;
  description?: string;
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
  description,
  queryKeyBase,
  fetchFn,
  paramsSchema,
  schema,
  initialParams,
}: QueryPageProps<ParamsSchema, DataSchema>) {
  const [params, setParams] = useState<z.infer<ParamsSchema>>(initialParams);
  const queryKey: QueryKey = [queryKeyBase, params];

  const queryClient = useQueryClient();

  function handleSubmit(values: z.infer<ParamsSchema>) {
    setParams(values);
    queryClient.invalidateQueries({ queryKey });
  }

  return (
    <>
      <div className="space-y-2 mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>{description}</p>
      </div>
      <SchemaForm
        schema={paramsSchema}
        defaultValues={params as DefaultValues<z.infer<DataSchema>>}
        onSubmit={handleSubmit}
        className="flex justify-between items-start space-y-4 gap-4 mb-0 [&>div]:mb-0"
        renderSubmit={(form) => (
          <Button
            type="submit"
            className="mt-5.5"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            <Play />
            Execute
          </Button>
        )}
      />
      <SchemaTable
        schema={schema}
        queryKey={queryKey}
        fetchFn={() => fetchFn(params)}
      />
    </>
  );
}
