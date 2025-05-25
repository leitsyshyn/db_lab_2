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
import { Combobox, Option } from "@/components/ui/combobox";
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
import { DatePicker } from "@/components/ui/date-picker";
import { getCountryName } from "@/lib/utils";
import { Play } from "lucide-react";
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
      case ZodFirstPartyTypeKind.ZodEnum:
      case ZodFirstPartyTypeKind.ZodNativeEnum: {
        const raw = core._def.values;
        const vals: string[] = Array.isArray(raw)
          ? raw
          : Object.values(raw as Record<string, string>);
        const options: Option[] = vals.map((v) => ({
          value: v,
          label: getCountryName(v) || v,
        }));
        return (
          <Combobox
            ref={field.ref}
            options={options}
            value={field.value as string}
            onChange={field.onChange}
          />
        );
      }

      case ZodFirstPartyTypeKind.ZodNumber:
        return <Input type="number" {...field} />;

      case ZodFirstPartyTypeKind.ZodBoolean:
        return (
          <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
        );

      case ZodFirstPartyTypeKind.ZodDate:
        return (
          <DatePicker
            value={field.value ?? undefined}
            onChange={(date) => field.onChange(date)}
          />
        );

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-end space-y-4 gap-4"
      >
        {Object.entries(schema.shape).map(([key, fieldSchema]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<FormValues>}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{key}</FormLabel>
                <FormControl>{renderInput(fieldSchema, field)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="mb-4"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          <Play />
          Execute
        </Button>
      </form>
    </Form>
  );
}
