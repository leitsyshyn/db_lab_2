"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  DefaultValues,
  Path,
  ControllerRenderProps,
  UseFormReturn,
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
import { DatePicker } from "@/components/ui/date-picker";
import { cn, getCountryName } from "@/lib/utils";
import { useFieldOptions } from "@/contexts/FieldOptionsContext";
interface QueryParamsFormProps<Schema extends ZodObject<ZodRawShape>> {
  schema: Schema;
  defaultValues: DefaultValues<z.infer<Schema>>;
  onSubmit: (values: z.infer<Schema>) => void;
  renderSubmit: (form: UseFormReturn<z.infer<Schema>>) => React.ReactNode;
  className?: string;
}

export function SchemaForm<Schema extends ZodObject<ZodRawShape>>({
  schema,
  defaultValues,
  onSubmit,
  renderSubmit,
  className,
}: QueryParamsFormProps<Schema>) {
  type FormValues = z.infer<Schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const fieldOptions = useFieldOptions();

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
    key: string,
    fieldSchema: ZodTypeAny,
    field: ControllerRenderProps<FormValues, Name>
  ): React.ReactNode {
    if (key.endsWith("Id") && fieldOptions?.[key]) {
      return (
        <Combobox
          ref={field.ref}
          options={fieldOptions[key]!}
          value={field.value as string}
          onChange={field.onChange}
        />
      );
    }

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
        return <Input type="number" {...field} value={field.value ?? ""} />;

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
        return <Input {...field} value={field.value ?? ""} />;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-4")}
      >
        {Object.entries(schema.shape).map(([key, fieldSchema]) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<FormValues>}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{key}</FormLabel>
                <div className="flex justify-between gap-4 items-center">
                  <FormControl>
                    {renderInput(key, fieldSchema, field)}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {renderSubmit(form)}
      </form>
    </Form>
  );
}
