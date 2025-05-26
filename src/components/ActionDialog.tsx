"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
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
import { Pencil, Plus } from "lucide-react";
import { SchemaForm } from "@/components/SchemaForm";

interface ActionDialogProps<Schema extends ZodObject<ZodRawShape>> {
  action: string;
  item: string;
  schema: Schema;
  defaultValues: DefaultValues<z.infer<Schema>>;
  queryKey: QueryKey;
  submitFn: (values: z.infer<Schema>) => Promise<void>;
}

export function ActionDialog<Schema extends ZodObject<ZodRawShape>>({
  action,
  item,
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
      toast.success(`${item} ${action} successfull!`);
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(`Failed to ${action.toLowerCase()} ${item.toLowerCase()}`);
      console.error(
        `Failed to ${action.toLowerCase()} ${item.toLowerCase()}:`,
        error
      );
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {action === "Create" ? (
          <Button className="w-full" disabled={mutation.isPending}>
            <Plus /> Create new {item}
          </Button>
        ) : action === "Edit" ? (
          <Button
            className="hover:bg-primary hover:text-white"
            variant="secondary"
            size="icon"
            disabled={mutation.isPending}
          >
            <Pencil />
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogHeader>
          <DialogTitle>
            {action} {item}
          </DialogTitle>
          <DialogDescription>
            Please fill out the form below to {action.toLowerCase()}{" "}
            {item.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <SchemaForm
          schema={schema}
          defaultValues={defaultValues as DefaultValues<z.infer<Schema>>}
          onSubmit={onSubmit}
          className="space-y-4"
          renderSubmit={(form) => (
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
          )}
        />
      </DialogContent>
    </Dialog>
  );
}
