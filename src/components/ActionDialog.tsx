"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z, ZodObject, ZodRawShape } from "zod";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

interface ActionDialogProps<Schema extends ZodObject<ZodRawShape>> {
  title?: string;
  schema: Schema;
  defaultValues: DefaultValues<z.infer<Schema>>;
  queryKey: QueryKey;
  submitFn: (values: z.infer<Schema>) => Promise<void>;
}

export function ActionDialog<Schema extends ZodObject<ZodRawShape>>({
  title = "Create",
  schema,
  defaultValues,
  queryKey,
  submitFn,
}: ActionDialogProps<Schema>) {
  type FormValues = z.infer<Schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${title} successfully!`);
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(`Error ${title.toLowerCase()}`);
      console.error(`Error ${title.toLowerCase()}:`, error);
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="default" disabled={mutation.isPending}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Please fill out the form below to {title.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {Object.keys(schema.shape).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key as Path<FormValues>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter className="space-x-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
