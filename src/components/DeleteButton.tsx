import { Button } from "@/components/ui/button";
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
import { QueryClient, QueryKey, useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  title: string;
  id: string;
  queryKey: QueryKey;
  deleteFn: (id: string) => Promise<void>;
  onDelete?: (id: string) => void;
}

export function DeleteButton({
  title,
  id,
  queryKey,
  deleteFn,
  onDelete,
}: DeleteButtonProps) {
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`Deleted ${title} successfully!`);
      onDelete?.(id);
    },
    onError: (error) => {
      toast.error(`Error deleting ${title}`);
      console.error(`Error deleting ${title}:`, error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive" disabled={mutation.isPending}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {title}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={mutation.isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
