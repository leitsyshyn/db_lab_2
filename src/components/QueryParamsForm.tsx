"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  DefaultValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  z,
  ZodRawShape,
  ZodObject,
  ZodTypeAny,
  ZodOptional,
  ZodEffects,
  ZodFirstPartyTypeKind,
} from "zod";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

interface QueryParamsFormProps<Schema extends ZodObject<ZodRawShape>> {
  schema: Schema;
  defaultValues: DefaultValues<z.infer<Schema>>;
  queryKey: QueryKey;
  submitFn: (values: z.infer<Schema>) => void;
}

export function QueryParamsForm<Schema extends ZodObject<ZodRawShape>>({
  schema,
  defaultValues,
  queryKey,
  submitFn,
}: QueryParamsFormProps<Schema>) {
  type FormValues = z.infer<Schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const queryClient = useQueryClient();

  function unwrapSchema<T extends ZodTypeAny>(s: T): ZodTypeAny {
    if (s instanceof ZodOptional) {
      return unwrapSchema(s._def.innerType);
    }
    if (s instanceof ZodEffects) {
      return unwrapSchema(s._def.schema);
    }
    return s;
  }

  function renderInput<Name extends Path<FormValues>>(
    fieldSchema: ZodTypeAny,
    field: ControllerRenderProps<FormValues, Name>
  ): React.ReactNode {
    const core = unwrapSchema(fieldSchema);
    const kind = core._def.typeName as ZodFirstPartyTypeKind;

    switch (kind) {
      case ZodFirstPartyTypeKind.ZodNumber:
        return <Input type="number" {...field} />;

      case ZodFirstPartyTypeKind.ZodBoolean:
        return (
          <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
        );

      case ZodFirstPartyTypeKind.ZodDate:
        const dateValue = field.value
          ? new Date(field.value).toISOString().substring(0, 10)
          : "";
        return <Input type="date" {...field} value={dateValue} />;

      default:
        return <Input {...field} />;
    }
  }

  const onSubmit = (data: FormValues) => {
    submitFn(data);
    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.entries(schema.shape).map(([key, fieldSchema]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<FormValues>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key}</FormLabel>
                <FormControl>{renderInput(fieldSchema, field)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Execute
        </Button>
      </form>
    </Form>
  );
}
